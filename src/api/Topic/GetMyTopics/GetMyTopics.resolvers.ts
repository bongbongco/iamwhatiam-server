import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetMyTopicsResponse } from "../../../types/graph";
import User from "../../../entities/User";

const resolvers: Resolvers = {
    Query: {
        GetMyTopics: privateResolver(async(
            _,
            __,
            { req }
        ): Promise<GetMyTopicsResponse> => {
            const user = await User.findOne(
                {id: req.user.id}, 
                {relations: ["topics"]}
            )
            try {
                if(user) {
                    return  {
                       ok: true,
                       topics: user.topics,
                       error: null 
                    };
                } else {
                    return {
                        ok: false,
                        topics: null,
                        error: "User not found"
                    };
                }
            } catch(error) {
                return {
                    ok: false,
                    topics: null,
                    error: null
                };
            }
        })
    }
};

export default resolvers;