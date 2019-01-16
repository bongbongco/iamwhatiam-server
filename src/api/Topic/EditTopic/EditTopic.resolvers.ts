import User from "../../../entities/User";
import Topic from "../../../entities/Topic";
import privateResolver from "../../../utils/privateResolver";
import { Resolvers } from "../../../types/resolvers";
import { EditTopicMutationArgs, EditTopicResponse } from "../../../types/graph";
import cleanNullArgs from "../../../utils/cleanNullArg";

const resolvers: Resolvers = {
    Mutation: {
        EditTopic: privateResolver(async(
            _,
            args: EditTopicMutationArgs,
            { req }
        ): Promise<EditTopicResponse> => {
            const user: User = req.user;
            try {
                const topic = await Topic.findOne({
                    id: args.topicId
                })
                if(topic) {
                    if(topic.userId === user.id) {
                        const notNull = cleanNullArgs(args);
                        await Topic.update(
                            {id: args.topicId}, 
                            {...notNull}
                        );
                        return {
                            ok: true,
                            error: null
                        };
                    } else {
                        return {
                            ok: false,
                            error: "Not Authorized"
                        };
                    }
                } else {
                    return {
                        ok: false,
                        error: "Topic not found"
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