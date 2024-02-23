import { postEntities } from "../entities/Post.entities.js"
import { skillEntities } from "../entities/Skill.entities.js"
import { topicEntities } from "../entities/Topic.entities.js"
import { userEntity } from "../entities/User.entities.js"
import { userSkillEntity } from "../entities/UserSkill.entities.js"



export const testSwapp = async () => {
        const userExmaple = {
        name: "joao",
        email: "example2@example.com",
        password: "123456"
    }
    const userExmaple2 = {
        name: "rodrigo",
        email: "example4@example.com",
        password: "53213"
    }
    const skillExampleuser1 = {
        skill_name: "javascript",
        describle_skill: "language programing"
    }

    const skillExampleuser2 = {
        skill_name: "php",
        describle_skill: "language programing"
    }




    

    const resultSkill1 = await skillEntities.create(skillExampleuser1);
    const resultSkill2 = await skillEntities.create(skillExampleuser2);

    const resultUser1 = await userEntity.create(userExmaple);
    const resultUser2 = await userEntity.create(userExmaple2);

    


    await userSkillEntity.create({
        user_id: resultUser1.id,
        skill_id: resultSkill1.id
    })





    await userSkillEntity.create({
        user_id: resultUser2.id,
        skill_id: resultSkill2.id
    })

    await userSkillEntity.create({
        user_id: resultUser2.id,
        skill_id: resultSkill1.id
    })

    // await swapSkillEntity.create({
    //     username_sender_id: resultUser1.id,
    //     username_recipient_id: resultUser2.id,
    //     skill_desired_id: resultSkill1.id,
    //     skill_offered_id: resultSkill2.id
    // });


    const topicExample1 = {
        user_id_create_topics: resultUser2.id, 
        describle: "language programing",
        title: "java x javascript"
    }

    const topicResult = await topicEntities.create(topicExample1);

    const postExample1 = {
        user_id_post: resultUser1.id,
        content: "java x javascript mas eu discordo",
        topic_id_commented: topicResult.id
    }

    const postResult = await postEntities.create(postExample1);
       
    return {
        sucess: "skill registrada na conta do usuario"
    };  
}