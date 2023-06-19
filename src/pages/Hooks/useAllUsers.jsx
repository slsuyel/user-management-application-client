
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../../baseUrl/baseUrl";
const useAllUsers = () => {
    const { refetch, data: allUsers = [], isLoading } = useQuery({
        queryKey: ["allUsers"],
        queryFn: async () => {
            const res = await fetch(`${baseUrl}/users`);
            return res.json();
        },
    });

    return [allUsers, refetch, isLoading];
};

export default useAllUsers;
