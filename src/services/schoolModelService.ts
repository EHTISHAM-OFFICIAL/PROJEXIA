import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth } from "../firebase/auth";
import { db } from "../firebase/firestore";
import { hashEmail } from "../utils/emailHash";
import {
  generateProjectToken,
  generateRequestNumber,
} from "../utils/requestNumber";
import { slugify } from "../utils/slug";
import { emailNotificationService } from "./emailNotificationService";
import { imgbbService } from "./imgbbService";

export type SchoolModelComponent = {
  name: string;
  category: string;
  quantity: string;
  notes: string;
  optional: boolean;
};

export type SchoolModelSpecification = {
  label: string;
  value: string;
};

export type SchoolModel = {
  id: string;
  title: string;
  slug: string;
  category: string;
  subcategory: string;
  modelType: string;
  difficulty: string;
  status: string;
  subject: string;
  gradeRange: string;
  shortDescription: string;
  description: string;
  problemStatement: string;
  workingPrinciple: string;
  howToUse: string;
  materials: string[];
  objectives: string[];
  features: string[];
  customizationOptions: string[];
  setupInstructions: string;
  maintenanceNotes: string;
  safetyNotes: string;
  components: SchoolModelComponent[];
  specifications: SchoolModelSpecification[];
  tags: string[];
  dimensions: string;
  estimatedBuildTime: string;
  thumbnailUrl: string;
  heroImageUrl: string;
  galleryUrls: string[];
  videoUrl: string;
  documentationUrl: string;
  featured: boolean;
  published: boolean;
  viewCount: number;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  createdAt: any;
  updatedAt: any;
};

// viewCount is managed by the service, not by the model editor.
export type SchoolModelDraft = Omit<
  SchoolModel,
  "id" | "createdAt" | "updatedAt" | "viewCount"
>;

export type SchoolSettings = {
  enabled: boolean;
  showInNavigation: boolean;
  showOnHome: boolean;
  electronicsEnabled: boolean;
  showElectronicsInNavigation: boolean;
  showElectronicsOnHome: boolean;
  categories: string[];
  subcategories: string[];
  modelTypes: string[];
  difficulties: string[];
  statuses: string[];
  subjects: string[];
};

export const DEFAULT_SCHOOL_SETTINGS: SchoolSettings = {
  enabled: true,
  showInNavigation: true,
  showOnHome: true,
  electronicsEnabled: true,
  showElectronicsInNavigation: true,
  showElectronicsOnHome: true,
  categories: [
    "Science Charts",
    "Biology Models",
    "Geography",
    "Solar System",
    "Art & Craft",
    "School Exhibition Models",
    "Others",
  ],
  subcategories: [
    "Anatomy",
    "Human Body",
    "Environment",
    "Physics Demonstrations",
    "Geography Maps",
    "Working Models",
    "Display Charts",
  ],
  modelTypes: [
    "Static Chart",
    "3D Model",
    "Working Model",
    "Interactive Demonstration",
    "Exhibition Display",
    "Classroom Teaching Aid",
  ],
  difficulties: ["Easy", "Moderate", "Advanced"],
  statuses: ["Available for quote", "Made to order", "Concept / reference"],
  subjects: [
    "Biology",
    "Physics",
    "Chemistry",
    "Geography",
    "Mathematics",
    "Environmental Science",
    "General Science",
    "Art & Craft",
  ],
};

const models = collection(db, "schoolModels");
const settings = doc(db, "settings", "schoolModels");
const requests = collection(db, "projectRequests");

function normalize(snapshot: any): SchoolModel {
  const data = snapshot.data();

  return {
    id: snapshot.id,
    title: data.title ?? "Untitled model",
    slug: data.slug ?? snapshot.id,
    category: data.category ?? "Others",
    subcategory: data.subcategory ?? "",
    modelType: data.modelType ?? "",
    difficulty: data.difficulty ?? "",
    status: data.status ?? "Available for quote",
    subject: data.subject ?? "",
    gradeRange: data.gradeRange ?? "",
    shortDescription: data.shortDescription ?? "",
    description: data.description ?? "",
    problemStatement: data.problemStatement ?? "",
    workingPrinciple: data.workingPrinciple ?? "",
    howToUse: data.howToUse ?? "",
    materials: Array.isArray(data.materials) ? data.materials : [],
    objectives: Array.isArray(data.objectives) ? data.objectives : [],
    features: Array.isArray(data.features) ? data.features : [],
    customizationOptions: Array.isArray(data.customizationOptions)
      ? data.customizationOptions
      : [],
    setupInstructions: data.setupInstructions ?? "",
    maintenanceNotes: data.maintenanceNotes ?? "",
    safetyNotes: data.safetyNotes ?? "",
    components: Array.isArray(data.components) ? data.components : [],
    specifications: Array.isArray(data.specifications)
      ? data.specifications
      : [],
    tags: Array.isArray(data.tags) ? data.tags : [],
    dimensions: data.dimensions ?? "",
    estimatedBuildTime: data.estimatedBuildTime ?? "",
    thumbnailUrl: data.thumbnailUrl ?? "",
    heroImageUrl: data.heroImageUrl ?? "",
    galleryUrls: Array.isArray(data.galleryUrls) ? data.galleryUrls : [],
    videoUrl: data.videoUrl ?? "",
    documentationUrl: data.documentationUrl ?? "",
    featured: data.featured === true,
    published: data.published === true,
    viewCount: Number(data.viewCount) || 0,
    seoTitle: data.seoTitle ?? "",
    seoDescription: data.seoDescription ?? "",
    keywords: Array.isArray(data.keywords) ? data.keywords : [],
    createdAt: data.createdAt ?? null,
    updatedAt: data.updatedAt ?? null,
  };
}

function toTimestamp(value?: string) {
  if (!value) return null;

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : Timestamp.fromDate(parsed);
}

export const schoolModelService = {
  async getSettings(): Promise<SchoolSettings> {
    const snapshot = await getDoc(settings);
    const data = snapshot.exists() ? snapshot.data() : {};

    return {
      enabled:
        typeof data.enabled === "boolean" ? data.enabled : true,
      showInNavigation:
        typeof data.showInNavigation === "boolean"
          ? data.showInNavigation
          : true,
      showOnHome:
        typeof data.showOnHome === "boolean" ? data.showOnHome : true,
      electronicsEnabled:
        typeof data.electronicsEnabled === "boolean"
          ? data.electronicsEnabled
          : true,
      showElectronicsInNavigation:
        typeof data.showElectronicsInNavigation === "boolean"
          ? data.showElectronicsInNavigation
          : true,
      showElectronicsOnHome:
        typeof data.showElectronicsOnHome === "boolean"
          ? data.showElectronicsOnHome
          : true,
      categories:
        Array.isArray(data.categories) && data.categories.length
          ? data.categories
          : DEFAULT_SCHOOL_SETTINGS.categories,
      subcategories: Array.isArray(data.subcategories)
        ? data.subcategories
        : DEFAULT_SCHOOL_SETTINGS.subcategories,
      modelTypes: Array.isArray(data.modelTypes)
        ? data.modelTypes
        : DEFAULT_SCHOOL_SETTINGS.modelTypes,
      difficulties: Array.isArray(data.difficulties)
        ? data.difficulties
        : DEFAULT_SCHOOL_SETTINGS.difficulties,
      statuses: Array.isArray(data.statuses)
        ? data.statuses
        : DEFAULT_SCHOOL_SETTINGS.statuses,
      subjects: Array.isArray(data.subjects)
        ? data.subjects
        : DEFAULT_SCHOOL_SETTINGS.subjects,
    };
  },

  async saveSettings(value: SchoolSettings) {
    await setDoc(
      settings,
      { ...value, updatedAt: serverTimestamp() },
      { merge: true },
    );
  },

  async getPublished(): Promise<SchoolModel[]> {
    const snapshot = await getDocs(
      query(models, where("published", "==", true), orderBy("title")),
    );
    return snapshot.docs.map(normalize);
  },

  async getAll(): Promise<SchoolModel[]> {
    const snapshot = await getDocs(query(models, orderBy("updatedAt", "desc")));
    return snapshot.docs.map(normalize);
  },

  async getBySlug(slug: string): Promise<SchoolModel | null> {
    const snapshot = await getDocs(
      query(
        models,
        where("slug", "==", slug),
        where("published", "==", true),
      ),
    );

    return snapshot.empty ? null : normalize(snapshot.docs[0]);
  },

  async save(value: SchoolModelDraft, id?: string) {
    const baseSlug = slugify(value.slug || value.title) || "school-model";
    const matchingModels = await getDocs(
      query(models, where("slug", "==", baseSlug)),
    );
    const slugExists = matchingModels.docs.some(
      (item) => item.id !== id,
    );
    const uniqueSlug = slugExists
      ? `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`
      : baseSlug;

    const payload = {
      ...value,
      slug: uniqueSlug,
      title: value.title.trim(),
      updatedAt: serverTimestamp(),
    };

    if (id) {
      await updateDoc(doc(db, "schoolModels", id), payload);
      return;
    }

    await addDoc(models, {
      ...payload,
      viewCount: 0,
      createdAt: serverTimestamp(),
    });
  },

  async delete(id: string) {
    await deleteDoc(doc(db, "schoolModels", id));
  },

  async setPublished(id: string, published: boolean) {
    await updateDoc(doc(db, "schoolModels", id), {
      published,
      updatedAt: serverTimestamp(),
    });
  },

  async setFeatured(id: string, featured: boolean) {
    await updateDoc(doc(db, "schoolModels", id), {
      featured,
      updatedAt: serverTimestamp(),
    });
  },

  incrementViewCount(id: string): void {
    void updateDoc(doc(db, "schoolModels", id), {
      viewCount: increment(1),
    }).catch(() => {
      // View tracking must never interrupt the public model page.
    });
  },

  async requestQuote(value: {
    model: SchoolModel;
    name: string;
    email: string;
    phone: string;
    whatsapp?: string;
    country?: string;
    city?: string;
    preferredContactMethod?: string;
    grade: string;
    quantity: string;
    dimensions: string;
    deadline: string;
    customization: string;
    details: string;
    purpose?: string;
    modelFormat?: string;
    interaction?: string;
    preferredMaterials?: string;
    labelLanguage?: string;
    assemblyRequirement?: string;
    displayEnvironment?: string;
    powerRequirements?: string;
    budgetRange?: string;
    budgetNotes?: string;
    startDate?: string;
    timelineFlexibility?: string;
    urgency?: string;
    referenceLinks?: string[];
    referenceDescription?: string;
    additionalNotes?: string;
    files?: File[];
  }) {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("Please sign in before submitting a quote request.");
    }

    const uploads = value.files?.length
      ? await imgbbService.uploadMany(value.files)
      : [];
    const attachments = uploads.map((uploaded, index) => ({
      name: value.files![index].name,
      url: uploaded.url,
      storagePath: uploaded.deleteUrl,
      contentType: value.files![index].type,
      size: value.files![index].size,
    }));

    const requestNumber = generateRequestNumber();
    const projectToken = generateProjectToken();
    const requestRef = doc(requests);

    const description = [
      "School Charts & Educational Models quote request.",
      "Selected item: " + value.model.title,
      "Grade/class: " + (value.grade || value.model.gradeRange || "Not specified"),
      "Purpose: " + (value.purpose || "Not specified"),
      "Model format: " + (value.modelFormat || "Not specified"),
      "Interaction: " + (value.interaction || "Not specified"),
      "Preferred materials: " + (value.preferredMaterials || "Not specified"),
      "Label language: " + (value.labelLanguage || "Not specified"),
      "Assembly: " + (value.assemblyRequirement || "Not specified"),
      "Display environment: " + (value.displayEnvironment || "Not specified"),
      "Power / mechanism requirements: " + (value.powerRequirements || "Not specified"),
      "Quantity: " + value.quantity,
      "Dimensions: " + (value.dimensions || value.model.dimensions || "Not specified"),
      "Needed by: " + (value.deadline || "Not specified"),
      "Customization: " + (value.customization || "Not specified"),
      "Budget: " + (value.budgetRange || "Not specified"),
      "Budget notes: " + (value.budgetNotes || "Not specified"),
      "Requirements: " + value.details,
      "Additional context: " + (value.additionalNotes || "Not specified"),
    ].join("\n");

    await setDoc(requestRef, {
      requestNumber,
      projectToken,
      ownerUid: currentUser.uid,
      status: "new",
      priority: value.urgency === "Urgent" ? "high" : "normal",
      serviceType: "school-model",
      schoolModel: {
        itemId: value.model.id,
        slug: value.model.slug,
        category: value.model.category,
        modelFormat: value.modelFormat || null,
        interaction: value.interaction || null,
      },
      contact: {
        fullName: value.name,
        email: value.email.toLowerCase(),
        phone: value.phone || null,
        whatsapp: value.whatsapp || null,
        country: value.country || null,
        city: value.city || null,
        preferredContactMethod: value.preferredContactMethod || "Email",
      },
      project: {
        title: value.model.title,
        category: value.model.category,
        type: "School chart / educational model",
        purpose: value.purpose || "Educational model quote",
        description,
      },
      technical: {
        preferredPlatforms: [],
        connectivity: [],
        sensors: [],
        outputs: [],
        powerSource: null,
        powerRequirements: value.powerRequirements || null,
      },
      software: {
        requiresMobileApp: false,
        requiresWebDashboard: false,
        requiresCloudDatabase: false,
        requiresNotifications: false,
        requiresRemoteControl: false,
        notes: null,
        languages: [],
      },
      scale: {
        complexity: "Not applicable",
        prototypeQuantity: Number(value.quantity) || null,
        estimatedQuantity: Number(value.quantity) || null,
        deploymentEnvironment: value.displayEnvironment || null,
      },
      budget: {
        range: value.budgetRange || null,
        notes: value.budgetNotes || "Quote requested; no fixed price displayed.",
      },
      timeline: {
        desiredStartDate: toTimestamp(value.startDate),
        desiredDeadline: toTimestamp(value.deadline),
        flexibility: value.timelineFlexibility || null,
        urgency: value.urgency || "Normal",
      },
      references: {
        links: (value.referenceLinks || []).filter(Boolean),
        description: value.referenceDescription || null,
      },
      attachments,
      additionalRequirements: {
        specialRequirements:
          [
            value.customization,
            value.preferredMaterials
              ? "Preferred materials: " + value.preferredMaterials
              : "",
            value.labelLanguage
              ? "Label / content language: " + value.labelLanguage
              : "",
            value.assemblyRequirement
              ? "Assembly: " + value.assemblyRequirement
              : "",
          ]
            .filter(Boolean)
            .join("\n") || null,
        additionalNotes:
          [
            value.details,
            value.additionalNotes,
            value.interaction ? "Interaction: " + value.interaction : "",
            value.powerRequirements
              ? "Power / mechanism requirements: " + value.powerRequirements
              : "",
          ]
            .filter(Boolean)
            .join("\n\n") || null,
        consultationRequired: false,
        hasExistingHardware: false,
        existingHardwareDescription: null,
        hasExistingCode: false,
        existingCodeDescription: null,
      },
      consent: {
        agreeToTerms: true,
        allowContact: true,
      },
      customerUpdate: null,
      customerUpdateAt: null,
      metadata: {
        source: "school-model-catalog",
        userAgent: navigator.userAgent.slice(0, 300),
        createdFrom: "/request-school-model",
      },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    try {
      await setDoc(doc(db, "requestStatusLookup", requestNumber), {
        requestNumber,
        requestId: requestRef.id,
        status: "new",
        projectTitle: value.model.title,
        emailHash: await hashEmail(value.email),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        customerUpdate: null,
        customerUpdateAt: null,
        deletedAt: null,
      });
    } catch {
      // The main request is already saved; lookup creation is best-effort.
    }

    try {
      await emailNotificationService.notify({
        subject: "New school model quote request — " + value.model.title,
        message:
          value.name +
          " (" +
          value.email +
          ") requested a quote.\n" +
          "Reference: " +
          requestNumber +
          "\nItem: " +
          value.model.title +
          "\nCategory: " +
          value.model.category +
          "\nGrade/class: " +
          (value.grade || "Not specified") +
          "\nModel format: " +
          (value.modelFormat || "Not specified") +
          "\nInteraction: " +
          (value.interaction || "Not specified") +
          "\nPreferred materials: " +
          (value.preferredMaterials || "Not specified") +
          "\nLanguage: " +
          (value.labelLanguage || "Not specified") +
          "\nAssembly: " +
          (value.assemblyRequirement || "Not specified") +
          "\nDisplay environment: " +
          (value.displayEnvironment || "Not specified") +
          "\nPower / mechanism: " +
          (value.powerRequirements || "Not specified") +
          "\nQuantity: " +
          value.quantity +
          "\nDimensions: " +
          (value.dimensions || "Not specified") +
          "\nNeeded by: " +
          (value.deadline || "Not specified") +
          "\nBudget: " +
          (value.budgetRange || "Not specified") +
          "\nRequirements: " +
          value.details +
          "\nAdditional context: " +
          (value.additionalNotes || "Not specified") +
          "\nReferences: " +
          ((value.referenceLinks || []).filter(Boolean).join(", ") || "None") +
          "\nAttachments: " +
          attachments.length,
        replyTo: value.email,
        name: value.name,
        email: value.email,
        title: value.model.title,
        requestNumber,
        maxAttempts: 2,
      });
    } catch {
      // Email delivery is best-effort and must not undo a saved request.
    }

    return requestNumber;
  },
};
