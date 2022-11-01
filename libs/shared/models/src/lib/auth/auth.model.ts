type userUid = string;

// Entities
export interface UserEntity {
  id: userUid;
  name: string;
  email?: string;
  photoURL?: string | null;
}
