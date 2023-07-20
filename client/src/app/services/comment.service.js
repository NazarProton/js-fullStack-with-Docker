import httpService from "./http.service";

const commentsEndpoint = "/comments/";

const commentService = {
    createComment: async (payload) => {
        const { data } = await httpService.post(commentsEndpoint, payload);
        return data;
    },
    getComments: async (pageId) => {
        const { data } = await httpService.get(commentsEndpoint, {
            params: {
                orderBy: "pageId",
                equalTo: `${pageId}`
            }
        });
        return data;
    },
    removeComments: async (commentId) => {
        const { data } = await httpService.delete(commentsEndpoint + commentId);
        return data;
    }
};
export default commentService;