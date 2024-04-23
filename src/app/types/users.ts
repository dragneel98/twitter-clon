export interface users{
    avatar_url: string;
    created_at: string;
    id: string;
    name: string;
    user_name: string;
    users: {
        avatar_url: string;
        created_at: string;
        id: string;
        name: string;
        user_name: string;
    } | null;
}[]