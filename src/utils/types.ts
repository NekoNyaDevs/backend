export interface  APIRouteInfos {
    name: string;
    description: string;
    path: string;
    methods: APIRouteMethods[];
    parameters: APIRouteParameters[];
    queries: APIRouteQueries[];
    body: APIRouteBody[];
}

export interface APIRouteParameters {
    name: string;
    description: string;
    required: boolean;
    type: string;
    values?: string[];
}

export interface APIRouteQueries {
    name: string;
    description: string;
    required: boolean;
    type: string;
}

export interface APIRouteBody {
    name: string;
    description: string;
    required: boolean;
    type: string;
    max_length?: number;
    min_length?: number;
}

export type APIRouteMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS" | "HEAD" | "CONNECT" | "TRACE" | string;

export type APIErrorTypes = "APIError" | "NotFoundError" | "BadRequestError" | "ValidationError" | "InternalServerError" | string;