import Topic from "../../../entities/Topic";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateResolver";
import { Resolvers } from "../../../types/resolvers";
import { 
    DeleteTopicMutationArgs, 
    DeleteTopicResponse 
} from "../../../types/graph";

const resolvers: Resolvers = {
    Mutation: {
        DeleteTopic: privateResolver(async(
            _,
            args: DeleteTopicMutationArgs,
            { req }
        ): Promise<DeleteTopicResponse> => {
            const user: User = req.user;
            try {
                const topic = await Topic.findOne({id: args.topicId});
                if (topic) {
                    if(topic.userId === user.id) {
                        topic.remove();
                    } else {
                        return {
                            ok: false,
                            error: "Not Authorized"
                        }
                    }
                } else {
                    return {
                        ok: false,
                        error: "Place not found"
                    };
                }
                return {
                    ok: true,
                    error: null
                };
            } catch(error) {
                return {
                    ok: false,
                    error: error.message
                };
            }
        })
    }
};

export default resolvers;