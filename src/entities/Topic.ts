import { 
    BaseEntity, 
    Column, 
    Entity, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn,
    ManyToOne, 
} from "typeorm";
import User from "./User";

@Entity()
class Topic extends BaseEntity{
    @PrimaryGeneratedColumn() id: number

    @Column({
        type: "text"
    })
    subject: string;
    
    @Column({
        type: "text"
    })
    content: string;
 
    @Column({
        type: "boolean",
        default: false
    })
    isFav: boolean;

    @Column({
        nullable: true
    })
    userId: number;

    @ManyToOne(type => User, user => user.topics)
    user: User;

    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updatedAt: string;

}

export default Topic;