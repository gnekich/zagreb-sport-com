import {
    ApolloClient,
    InMemoryCache,
    // ApolloProvider,
    createHttpLink,
    gql,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Get zustand store
import useUserStore from "@/stores/useUserStore";

const httpLink = createHttpLink({
    uri: import.meta.env.VITE_PUBLIC_API_URL,
});

const authLink = setContext((_, { headers }) => {
    const token = useUserStore.getState().token;

    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : ``,
        },
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
