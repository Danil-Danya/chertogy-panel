import { getProfile } from "@/entities/users/lib/api";
import { useUserStore } from "@/entities/users/model/store";

const checkAuth = async () => {
    try {
        const profile = await getProfile();
        return profile?.status === 200;
    }
    catch (error) {
        console.log('Авторизация провалена:', error);
        return false;
    }
}

const checkRoles = async (allowedRoles=[]) => {
    try {
        const userStore = useUserStore();
        
        await userStore.fetchProfile();
        const profile = userStore.profile;

        if (!profile) {
            return false;
        }

        if (allowedRoles.length === 0) {
            return true
        }

        return allowedRoles.includes(profile.role);
    }
    catch (error) {
        console.error("Ошибка проверки роли:", error);
        return false;
    }
}

export {
    checkAuth,
    checkRoles
}