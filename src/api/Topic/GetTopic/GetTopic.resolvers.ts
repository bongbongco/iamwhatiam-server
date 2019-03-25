import Topic from "../../../entities/Topic";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetTopicQueryArgs, GetTopicResponse } from "../../../types/graph";

const resolvers: Resolvers = {
    Query: {
        GetTopic: privateResolver(async(
            _,
            args: GetTopicQueryArgs,
            { req }
        ): Promise<GetTopicResponse> => {
            try {
                const topic = await Topic.findOne({
                    id: args.topicId
                })
                if(topic) {
                    return {
                        ok: true,
                        error: null,
                        topic
                    }
                }
                else {
                    return {
                        ok: false,
                        error: "Topic not found",
                        topic: null
                    }
                }
            }
            catch(error) {
                return {
                    ok: false,
                    error: error.message,
                    topic: null
                };
            }
        })
    }
};

export default resolvers;