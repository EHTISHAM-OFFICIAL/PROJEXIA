import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Clock3, Search } from 'lucide-react';
import { Seo } from '../../components/ui/Seo';
import { Badge } from '../../components/ui/Badge';
import { ErrorState } from '../../components/ui/ErrorState';
import { EmptyState } from '../../components/ui/EmptyState';
import { Skeleton } from '../../components/ui/Skeleton';
import { Select, TextInput } from '../../components/forms/Inputs';
import { meetingService } from '../../services/meetingService';
import type { MeetingRequest, MeetingStatus } from '../../types/meeting';
import { formatDateTime } from '../../utils/formatting';
import { toUserMessage } from '../../utils/errors';

const STATUSES = [
  { value:'pending', label:'Pending' }, { value:'confirmed', label:'Confirmed' },
  { value:'completed', label:'Completed' }, { value:'cancelled', label:'Cancelled' },
] as const;
const TONE: Record<MeetingStatus, 'warning'|'info'|'success'|'danger'> = {
  pending:'warning', confirmed:'info', completed:'success', cancelled:'danger'
};

export default function MeetingRequests() {
  const [data,setData]=useState<MeetingRequest[]|null>(null); const [loading,setLoading]=useState(true);
  const [error,setError]=useState<string|null>(null); const [search,setSearch]=useState(''); const [status,setStatus]=useState('');
  const [updating,setUpdating]=useState<string|null>(null);
  const load=async()=>{setLoading(true);setError(null);try{setData(await meetingService.listMeetings())}catch(e){setError(toUserMessage(e,'Could not load meeting requests.'))}finally{setLoading(false)}};
  useEffect(()=>{void load()},[]);
  const filtered=useMemo(()=>{const term=search.trim().toLowerCase();return(data??[]).filter(item=>
    (!status||item.status===status)&&(!term||[item.fullName,item.email,item.purpose,item.discussion,item.projectReference].join(' ').toLowerCase().includes(term))
  )},[data,search,status]);
  const changeStatus=async(item:MeetingRequest,next:MeetingStatus)=>{setUpdating(item.id);try{await meetingService.updateMeeting(item.id,{status:next,adminNotes:item.adminNotes,confirmedDate:item.confirmedDate,confirmedTime:item.confirmedTime,meetingLink:item.meetingLink});await load()}catch(e){setError(toUserMessage(e,'Could not update the meeting status.'))}finally{setUpdating(null)}};
  return <><Seo title="Meeting Requests" noIndex/>
    <header><h1 className="text-2xl font-semibold tracking-tight">Meeting requests</h1><p className="mt-1.5 text-sm text-content-secondary">{data?data.length:'Loading…'} total — review preferred times and confirm meetings manually.</p></header>
    <div className="mt-8 grid gap-3 md:grid-cols-[minmax(0,1fr)_200px]"><div className="relative"><Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-content-muted"/><TextInput value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name, email, purpose or project reference…" className="pl-9"/></div><Select options={STATUSES} placeholder="All statuses" value={status} onChange={e=>setStatus(e.target.value)}/></div>
    <div className="mt-6">{loading&&<div className="flex flex-col gap-3">{Array.from({length:5},(_,i)=><Skeleton key={i} className="h-24 w-full"/>)}</div>}
      {!loading&&error&&<ErrorState message={error} onRetry={()=>void load()}/>}
      {!loading&&!error&&!filtered.length&&<EmptyState title="No meeting requests found" description={data?.length?'Nothing matches the current filters.':'Meeting requests submitted through the website will appear here.'}/>}
      {!loading&&!error&&filtered.length>0&&<ul className="flex flex-col gap-2">{filtered.map(item=><li key={item.id} className="rounded-lg border border-line bg-surface p-4">
        <div className="flex flex-wrap items-start justify-between gap-4"><Link to={`/admin/meetings/${item.id}`} className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><span className="text-sm font-medium text-content hover:text-accent">{item.fullName}</span><Badge tone={TONE[item.status]}>{item.status}</Badge></div><p className="mt-1 text-xs text-content-muted">{item.email} · {item.purpose}</p><div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-content-secondary"><span className="inline-flex items-center gap-1"><CalendarDays size={13}/>{item.preferredDate}</span><span className="inline-flex items-center gap-1"><Clock3 size={13}/>{item.preferredTime} · {item.timezone}</span><span>{item.duration}</span></div></Link>
          <Select options={STATUSES} value={item.status} disabled={updating===item.id} aria-label={`Change status for ${item.fullName}`} onChange={e=>void changeStatus(item,e.target.value as MeetingStatus)} className="h-9 w-36 text-xs"/></div>
        <p className="mt-3 font-mono text-xs text-content-muted">{formatDateTime(item.createdAt as never)}</p>
      </li>)}</ul>}</div>
  </>;
}
