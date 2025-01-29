declare type SessionProps = {
  access_token: string;
  user: {
    onboardingCompleted: boolean;
    hasMicrosoftSync: boolean;
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    status: string;
    verificationToken: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    __v: 0;
  };
} | null;
