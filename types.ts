export interface Student {
  id: string; // Iqama/ID
  fullName: {
    first: string;
    father: string;
    grandfather: string;
    family: string;
  };
  dob: string;
  level: string;
  password: string;
  motherName: string;
  motherPhone: string;
  teacher: string;
  busSubscription: boolean;
  initialPaymentReceipt: string | null;
  remainingPaymentReceipt: string | null;
  registrationDate: string;
  isSaudi?: boolean;
}

export interface FeeStructure {
  id: string;
  title: string;
  amount: number;
  description?: string;
}

export enum AcademicLevel {
  LEVEL_1 = 'المستوى الأول (3-4 سنوات)',
  LEVEL_2 = 'المستوى الثاني (4-5 سنوات)',
  LEVEL_3 = 'المستوى الثالث (5-6 سنوات)',
  UNKNOWN = 'غير محدد',
}