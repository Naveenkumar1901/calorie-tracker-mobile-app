import { axiosClient } from '@/services/api/axiosClient';
import type { CurrentUser } from '@/store/slices/authSlice';

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  expiresOn: string;
  user: CurrentUser;
}

interface LoginApiResponse {
  accessToken: string;
  expiresOn: string;
  user: {
    id: number;
    name: string;
    email?: string;
    mobile?: string;
    branchId?: number | null;
    branchName?: string;
    roleId: number;
    roleName: string;
    lastLoginOn?: string | null;
    profileImage?: string | null;
  };
}

export const authService = {
  async login(payload: LoginRequest): Promise<LoginResponse> {
    const { data } = await axiosClient.post<LoginApiResponse>('/UserManagement/Login', payload, {
      _skipAuthRefresh: true,
    });
    const user = data.user;
    return {
      accessToken: data.accessToken,
      expiresOn: data.expiresOn,
      user: {
        id: String(user.id),
        email: user.email ?? '',
        displayName: user.name,
        roles: [user.roleName],
        roleId: user.roleId,
        roleName: user.roleName,
        mobile: user.mobile || undefined,
        branchId: user.branchId != null ? String(user.branchId) : undefined,
        branchName: user.branchName || undefined,
        lastLoginOn: user.lastLoginOn || undefined,
        profileImage: user.profileImage || null,
        permissions: [],
      },
    };
  },
};
