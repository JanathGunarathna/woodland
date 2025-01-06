// src/services/auth.js
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get user role from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) {
      throw new Error("User data not found");
    }
    
    const userData = userDoc.data();
    return {
      user: {
        uid: user.uid,
        email: user.email,
        role: userData.role,
        name: userData.name
      },
      role: userData.role
    };
  } catch (error) {
    throw error;
  }
};

// Role-based route guard
export const checkAuthorization = (userRole, allowedRoles) => {
  return allowedRoles.includes(userRole);
};

export const ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student'
};

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: ['create', 'read', 'update', 'delete'],
  [ROLES.TEACHER]: ['read'],
  [ROLES.STUDENT]: ['read']
};