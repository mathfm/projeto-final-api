import { object, string } from "yup";


export const userSchema = object({
    name: string().required().min(3),
    username: string().required().min(5),
    email: string().email().required(),
    password: string().required().min(8)
})

export const skillSchema = object({
    skill_name: string().required().min(2).max(20).lowercase(),
    description: string().required().min(5).max(200).lowercase()
});

export const userSkillSchema = object({
    user_id: string().required().length(36),
    skill_id: string().required().length(36)
});


export const swapSkillSchema = object({
    user_sender_id: string().required().length(36),
    skill_offered_id: string().required().length(36),
    user_recipient_id: string().required().length(36),
    skill_desired_id: string().required().length(36)
});

export const topicSchema = object({
    title: string().required().min(3).max(20).lowercase(),
    description: string().required().min(5).max(200).lowercase(),
    user_id_create_topic: string().required().length(36),
    skill_id_category: string().required().length(36)
})

export const schemaReduceGenerator = (schema, properties) => {
    const schemaReduce = object().shape(
        Object.fromEntries(
            properties.map(property => [property, schema.fields[property]])
        )
    )
    return schemaReduce;
}
