import React, { createContext, useContext, useState, useEffect } from 'react';
import { Student } from '../types';

interface AuthContextType {
  student: Student | null;
  login: (id: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (student: Student) => Promise<void>;
  updateStudent: (updatedStudent: Student) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [student, setStudent] = useState<Student | null>(null);

  // Load session from local storage on mount
  useEffect(() => {
    const storedSession = localStorage.getItem('albayan_session');
    if (storedSession) {
      setStudent(JSON.parse(storedSession));
    }
  }, []);

  const login = async (id: string, password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const studentsRaw = localStorage.getItem('albayan_students');
    const students: Student[] = studentsRaw ? JSON.parse(studentsRaw) : [];
    
    const found = students.find(s => s.id === id && s.password === password);
    if (found) {
      setStudent(found);
      localStorage.setItem('albayan_session', JSON.stringify(found));
      return true;
    }
    return false;
  };

  const logout = () => {
    setStudent(null);
    localStorage.removeItem('albayan_session');
  };

  const register = async (newStudent: Student) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const studentsRaw = localStorage.getItem('albayan_students');
    const students: Student[] = studentsRaw ? JSON.parse(studentsRaw) : [];
    
    // Check if exists
    if (students.some(s => s.id === newStudent.id)) {
      throw new Error('رقم الهوية مسجل مسبقاً');
    }

    students.push(newStudent);
    localStorage.setItem('albayan_students', JSON.stringify(students));
    
    // Auto login after register
    setStudent(newStudent);
    localStorage.setItem('albayan_session', JSON.stringify(newStudent));
  };

  const updateStudent = (updatedStudent: Student) => {
    const studentsRaw = localStorage.getItem('albayan_students');
    const students: Student[] = studentsRaw ? JSON.parse(studentsRaw) : [];
    
    const index = students.findIndex(s => s.id === updatedStudent.id);
    if (index !== -1) {
      students[index] = updatedStudent;
      localStorage.setItem('albayan_students', JSON.stringify(students));
      setStudent(updatedStudent);
      localStorage.setItem('albayan_session', JSON.stringify(updatedStudent));
    }
  };

  return (
    <AuthContext.Provider value={{ student, login, logout, register, updateStudent }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};