import Place from "../../../entities/Place";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateResolver";
import { Resolvers } from "../../../types/resolvers";
import { 
    DeletePlaceMutationArgs, 
    DeletePlaceResponse 
} from "../../../types/graph";

const resolvers: Resolvers = {
    Mutation: {
        DeletePlace: privateResolver(async(
            _,
            args: DeletePlaceMutationArgs,
            { req }
        ): Promise<DeletePlaceResponse> => {
            const user: User = req.user;
            try {
                const place = await Place.findOne({id: args.placeId});
                if (place) {
                    if(place.userId === user.id) {
                        place.remove();
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