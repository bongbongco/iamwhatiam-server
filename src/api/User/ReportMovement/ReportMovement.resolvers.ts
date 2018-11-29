import { Resolvers } from "../../../types/resolvers";
import privateResolvers from "../../../utils/privateResolver";
import {
    ReportMovementMutationArgs, 
    ReportMovementResponse
} from "../../../types/graph";
import cleanNullArgs from "../../../utils/cleanNullArg";
import User from "../../../entities/User";

const resolvers: Resolvers = {
    Mutation: {
        ReportMovement: privateResolvers(async (
            _, 
            args: ReportMovementMutationArgs, 
            { req, pubSub }
        ): Promise<ReportMovementResponse> => {
            const user: User = req.user;
            const notNull = cleanNullArgs(args);
            try {
                await User.update({id: user.id}, { ...notNull });
                const updatedUser = await User.findOne({id: user.id});
                pubSub.publish("driverUpdate", {DriversSubscription: updatedUser});
                return {
                    ok: true,
                    error: null
                }
            } catch(error) {
                return {
                    ok: false,
                    error: error.message
                }
            }
        })
    }
};

export default resolvers;