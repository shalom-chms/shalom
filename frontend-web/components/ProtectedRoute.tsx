import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  requiredChurchId?: string;
}

export default function ProtectedRoute({ 
  children, 
  requiredRole, 
  requiredChurchId 
}: ProtectedRouteProps) {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
        return;
      }

      if (requiredRole) {
        // System admin can access everything
        if (userData?.role !== 'system_admin') {
          // For church-specific roles, check both role and churchId
          if (requiredChurchId && userData?.churchId !== requiredChurchId) {
            router.push('/unauthorized');
            return;
          }

          // Check if user has required role or higher
          const roleHierarchy: UserRole[] = [
            'system_admin',
            'church_admin',
            'leader',
            'staff',
            'member',
            'visitor'
          ];

          const requiredRoleIndex = roleHierarchy.indexOf(requiredRole);
          const userRoleIndex = roleHierarchy.indexOf(userData?.role || 'visitor');

          if (userRoleIndex > requiredRoleIndex) {
            router.push('/unauthorized');
            return;
          }
        }
      }
    }
  }, [user, userData, loading, requiredRole, requiredChurchId, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
