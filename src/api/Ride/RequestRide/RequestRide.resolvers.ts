
import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import { 
    RequestRideMutationArgs, 
    RequestRideResponse 
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
    Mutation: {
        RequesetRide: privateResolver(async(
            _,
            args: RequestRideMutationArgs,
            {req}): Promise<RequestRideResponse> => {
                const user: User = req.user;
                try {
                    const ride = await Ride.create({...args, passenger: user}).save();

                    return {
                        ok: true,
                        ride,
                        error: null
                    }
                } catch(error) {
                    return {
                        ok: false,
                        ride: null,
                        error: error.message
                    };
                }
            })       
    }
};

export default resolvers;