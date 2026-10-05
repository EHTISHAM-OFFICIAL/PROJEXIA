import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Seo } from '../../components/ui/Seo';
import { Button, ButtonLink } from '../../components/ui/Button';
import { Field } from '../../components/forms/Field';
import { Select, TextArea, TextInput } from '../../components/forms/Inputs';
import { ErrorState } from '../../components/ui/ErrorState';
import { Skeleton } from '../../components/ui/Skeleton';
import { meetingService } from '../../services/meetingService';
import type { MeetingRequest, MeetingStatus } from '../../types/meeting';
import { formatDateTime } from '../../utils/formatting';
import { toUserMessage } from '../../utils/errors';

const STATUSES=[{value:'pending',label:'Pending'},{value:'confirmed',label:'Confirmed'},{value:'completed',label:'Completed'},{value:'cancelled',label:'Cancelled'}] as const;

export default function MeetingDetail(){
  const {id}=useParams(); const navigate=useNavigate(); const [item,setItem]=useState<MeetingRequest|null>(null);
  const [loading,setLoading]=useState(true); const [saving,setSaving]=useState(false); const [error,setError]=useState<string|null>(null); const [saved,setSaved]=useState(false);
  const [status,setStatus]=useState<MeetingStatus>('pending'); const [adminNotes,setAdminNotes]=useState(''); const [confirmedDate,setConfirmedDate]=useState(''); const [confirmedTime,setConfirmedTime]=useState(''); const [meetingLink,setMeetingLink]=useState('');
  useEffect(()=>{if(!id)return;void meetingService.getMeeting(id).then(result=>{setItem(result);if(result){setStatus(result.status);setAdminNotes(result.adminNotes??'');setConfirmedDate(result.confirmedDate??'');setConfirmedTime(result.confirmedTime??'');setMeetingLink(result.meetingLink??'')}setLoading(false)}).catch(e=>{setError(toUserMessage(e,'Could not load this meeting request.'));setLoading(false)})},[id]);
  const save=async()=>{if(!id)return;setSaving(true);setError(null);setSaved(false);try{await meetingService.updateMeeting(id,{status,adminNotes,confirmedDate,confirmedTime,meetingLink});setSaved(true);const refreshed=await meetingService.getMeeting(id);if(refreshed)setItem(refreshed)}catch(e){setError(toUserMessage(e,'Could not save meeting changes.'))}finally{setSaving(false)}};
  const remove=async()=>{if(!id||!window.confirm('Delete this meeting request permanently?'))return;try{await meetingService.deleteMeeting(id);navigate('/admin/meetings',{replace:true})}catch(e){setError(toUserMessage(e,'Could not delete this meeting request.'))}};
  if(loading)return <><Seo title="Meeting request" noIndex/><Skeleton className="h-10 w-64"/><Skeleton className="mt-6 h-64 w-full"/></>;
  if(error&&!item)return <><Seo title="Meeting request" noIndex/><ErrorState message={error}/><ButtonLink to="/admin/meetings" variant="secondary" className="mt-4">Back to meetings</ButtonLink></>;
  if(!item)return <><Seo title="Meeting request" noIndex/><ErrorState message="This meeting request no longer exists."/></>;
  return <><Seo title="Meeting request" noIndex/>
    <Link to="/admin/meetings" className="inline-flex items-center gap-2 text-sm text-content-secondary hover:text-content"><ArrowLeft size={16}/> Meeting requests</Link>
    <header className="mt-6"><h1 className="text-2xl font-semibold tracking-tight">{item.fullName}</h1><p className="mt-1 text-sm text-content-secondary">{item.email} · Submitted {formatDateTime(item.createdAt as never)}</p></header>
    {error&&<div className="mt-6"><ErrorState message={error}/></div>}{saved&&<p className="mt-4 text-sm text-state-success">Meeting details saved.</p>}
    <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="card p-6"><h2 className="text-lg font-semibold">Request details</h2><dl className="mt-5 grid gap-4 sm:grid-cols-2 text-sm">
        <Detail label="Purpose" value={item.purpose}/><Detail label="Preferred date" value={item.preferredDate}/><Detail label="Preferred time" value={item.preferredTime}/><Detail label="Time zone" value={item.timezone}/><Detail label="Duration" value={item.duration}/><Detail label="Method" value={item.method}/><Detail label="Phone" value={item.phone||'Not provided'}/><Detail label="WhatsApp" value={item.whatsapp||'Not provided'}/><Detail label="Country" value={item.country||'Not provided'}/><Detail label="City" value={item.city||'Not provided'}/><Detail label="Project reference" value={item.projectReference||'Not provided'}/>
      </dl><div className="mt-6 border-t border-line pt-5"><h3 className="text-sm font-semibold">Discussion</h3><p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-content-secondary">{item.discussion}</p></div>{item.additionalNotes&&<div className="mt-6 border-t border-line pt-5"><h3 className="text-sm font-semibold">Additional notes</h3><p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-content-secondary">{item.additionalNotes}</p></div>}</section>
      <section className="card p-6"><h2 className="text-lg font-semibold">Manage meeting</h2><div className="mt-5 flex flex-col gap-5">
        <Field label="Status" htmlFor="status" required><Select id="status" options={STATUSES} value={status} onChange={e=>setStatus(e.target.value as MeetingStatus)}/></Field>
        <Field label="Confirmed date" htmlFor="confirmedDate"><TextInput id="confirmedDate" type="date" value={confirmedDate} onChange={e=>setConfirmedDate(e.target.value)}/></Field>
        <Field label="Confirmed time" htmlFor="confirmedTime"><TextInput id="confirmedTime" type="time" value={confirmedTime} onChange={e=>setConfirmedTime(e.target.value)}/></Field>
        <Field label="Meeting link" htmlFor="meetingLink" hint="Add the final Google Meet or other meeting URL once confirmed."><TextInput id="meetingLink" type="url" placeholder="https://…" value={meetingLink} onChange={e=>setMeetingLink(e.target.value)}/></Field>
        <Field label="Admin notes" htmlFor="adminNotes"><TextArea id="adminNotes" rows={6} value={adminNotes} onChange={e=>setAdminNotes(e.target.value)}/></Field>
        <Button loading={saving} onClick={()=>void save()}><span className="inline-flex items-center gap-2"><Save size={16}/>{saving?'Saving…':'Save meeting'}</span></Button>
        <Button variant="danger" onClick={()=>void remove()}>Delete request</Button>
      </div></section>
    </div>
  </>;
}
function Detail({label,value}:{label:string;value:string}){return <div><dt className="text-xs text-content-muted">{label}</dt><dd className="mt-1 break-words text-content">{value}</dd></div>}
