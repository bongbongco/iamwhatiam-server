import Topic from "../../../entities/Topic";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateResolver";
import { Resolvers } from "../../../types/resolvers";
import {AddTopicMutationArgs, AddTopicResponse} from "../../../types/graph";

const resolvers: Resolvers = {
    Mutation: {
        AddTopic: privateResolver(async(
            _,
            args: AddTopicMutationArgs,
            {req}
        ): Promise<AddTopicResponse> => {
            const user: User = req.user;
            try {
                await Topic.create({ ...args, user }).save();
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