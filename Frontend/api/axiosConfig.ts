export interface Response {
    data: any;
    error: any;
}

export const axiosWithErrorHandling = async (
    axiosInstance: any,
    config: any
): Promise<Response> => {
    try {
        const response = await axiosInstance(config);
        return {
            data: response.data,
            error: null,
        };
    } catch (error) {
        return {
            data: null,
            error: error,
        };
    }
};