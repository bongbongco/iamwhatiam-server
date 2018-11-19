import { Resolvers } from "../../../types/resolvers";
import { EmailSignUpMutationArgs, EmailSignUpRespose } from "../../../types/graph";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
    Mutation: {
        EmailSignUp: async(
            _,
            args: EmailSignUpMutationArgs
        ): Promise<EmailSignUpRespose> => {
            const { email } = args;
            try {
                const existingUser = await User.findOne({ email });
                if(existingUser) {
                    const token = createJWT(existingUser.id)
                    return {
                        ok: false,
                        error: "You should log in instead",
                        token
                    }
                } else {
                    const newUser = await User.create({...args}).save();
                    const token = createJWT(newUser.id); 
                    return {
                        ok: true,
                        error: null,
                        token
                    }
                }
            } catch(error) {
                return {
                    ok: false,
                    error: error.message,
                    token: null
                }
            }
        }
    }
};

export default resolvers;