'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminNavbar from '@/components/AdminNavbar';

const AdminLayout = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      router.push('/admin');
    }
  }, [router]);

  return (
    <div>
      <AdminNavbar/>
      {children}
    </div>
  );
};

export default AdminLayout;