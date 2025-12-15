import { 
    ScAddr,
    ScTemplate, 
    ScType 
} from 'ts-sc-client';
import { client } from '@api/sc/client';
import { generateLinkText } from './newMessageAgent';

const keynode_images = [
    { id: 'users', type: ScType.ConstNodeClass },
    { id: 'nrel_auth_session', type: ScType.NodeNonRole },
    { id: 'action_create_google_author', type: ScType.ConstNodeClass },
    { id: 'action_create_yandex_author', type: ScType.ConstNodeClass },
    { id: "action", type: ScType.ConstNodeClass },
    { id: "action_initiated", type: ScType.ConstNodeClass },
    { id: "rrel_1", type: ScType.ConstNodeRole },
<<<<<<< HEAD
    { id: "rrel_2", type: ScType.ConstNodeRole }
=======
    { id: "rrel_2", type: ScType.ConstNodeRole },
    { id: "concept_dialogue", type: ScType.ConstNodeClass },
    { id: "rrel_dialog_participant", type: ScType.ConstNodeRole }
>>>>>>> maxim/feat/yandex_disc
];


export const call_create_author_agent = async (
    code: string, 
    session: string,
    action: string,
) => {
    try {
<<<<<<< HEAD
        console.log("Start calling create user agent, session: ", session)
        const keynodes = await client.resolveKeynodes(keynode_images);
        const user_node = await find_user_by_session(session, keynodes);
        if (!user_node)
        {
            // generate code and session links in kb
            const code_link = await generateLinkText(code);
            const session_link = await generateLinkText(session);

            // alias for template
            const action_node_alias = "_action_node"

            const template = new ScTemplate();
            
            // call agent (realization in python module)
            template.triple(
                keynodes["action"], 
                ScType.VarPermPosArc, 
                [ScType.VarNode, action_node_alias]
            );
            template.triple(
                keynodes[action], 
                ScType.VarPermPosArc, 
                action_node_alias
            );
            template.triple(
                keynodes["action_initiated"], 
                ScType.VarPermPosArc, 
                action_node_alias
            );

            if (code_link)
                template.quintuple(
                    action_node_alias,
                    ScType.VarPermPosArc,
                    code_link,
                    ScType.VarPermPosArc,
                    keynodes["rrel_2"],
                );
            
            if (session_link)
                template.quintuple(
                    action_node_alias,
                    ScType.VarPermPosArc,
                    session_link,
                    ScType.VarPermPosArc,
                    keynodes["rrel_1"],
                );

            await client.generateByTemplate(template, {});
        }
        else {
            console.log(
                "User with such session: ",
                session, 
                " already exists"
                )
=======
        console.log("Start calling create user agent");
        const keynodes = await client.resolveKeynodes(keynode_images);
        
        let user_node = await find_user_by_session(session, keynodes);
        
        if (!user_node)
        {
            const code_link = await generateLinkText(code);
            const session_link = await generateLinkText(session);

            const action_node_alias = "_action_node"
            const template = new ScTemplate();
            
            template.triple(keynodes["action"], ScType.VarPermPosArc, [ScType.VarNode, action_node_alias]);
            template.triple(keynodes[action], ScType.VarPermPosArc, action_node_alias);
            template.triple(keynodes["action_initiated"], ScType.VarPermPosArc, action_node_alias);

            if (code_link) template.quintuple(action_node_alias, ScType.VarPermPosArc, code_link, ScType.VarPermPosArc, keynodes["rrel_2"]);
            if (session_link) template.quintuple(action_node_alias, ScType.VarPermPosArc, session_link, ScType.VarPermPosArc, keynodes["rrel_1"]);
            
            await client.generateByTemplate(template, {});    
            
            console.log("Waiting for kb to create author");
            await new Promise(resolve => setTimeout(resolve, 1500));

            user_node = await find_user_by_session(session, keynodes);

            if (user_node) {
                console.log("User created. Linking to Dialog");
                
                const dialogTemplate = new ScTemplate();
                const dialogAlias = '_dialog';

                // creating/finding dialog
                dialogTemplate.triple(
                    keynodes['concept_dialogue'],
                    ScType.VarPermPosArc,
                    [ScType.VarNode, dialogAlias]
                );
                // making user participant of the dialog
                dialogTemplate.quintuple(
                    dialogAlias,
                    ScType.VarPermPosArc,
                    user_node,
                    ScType.VarPermPosArc,
                    keynodes['rrel_dialog_participant']
                );

                await client.generateByTemplate(dialogTemplate, {});
                console.log("User linked to dialog successfully.");
            } else {
                console.error("Failed to create user via Backend Agent.");
            }
        }
        else {
            console.log("User with such session already exists");
>>>>>>> maxim/feat/yandex_disc
        }

    } catch (error) {
        console.error('Error with user saving in kb:', error);
        throw error;
    }
};


const find_user_by_session = async (
    session: string, 
    keynodes: Record<string, ScAddr>
) => {
<<<<<<< HEAD
    // check if user with such session exists in knowledge base
    const session_link = await client.searchLinksByContents([session])[0];
    if (session_link){
        const template = new ScTemplate();
        const component_user = '_user'
        const component_session = '_auth_session'
        template.quintuple(
            [ScType.VarNode, component_user],
            ScType.VarCommonArc,
            [session_link, component_session],
            ScType.VarPermPosArc,
            keynodes['nrel_auth_session'],
        );
        template.triple(
            keynodes['users'],
            ScType.VarPermPosArc,
            [ScType.VarNode, component_user],
        )
=======
    const session_links = await client.searchLinksByContents([session]);
    if (!session_links.length || !session_links[0] || !session_links[0].length) return null;
    
    const session_link = session_links[0][0];

    if (session_link){
        const template = new ScTemplate();
        const component_user = '_user'
        // const component_session = '_auth_session'
        
        template.quintuple(
            [ScType.VarNode, component_user],
            ScType.VarCommonArc,
            session_link,
            ScType.VarPermPosArc,
            keynodes['nrel_auth_session'],
        );
>>>>>>> maxim/feat/yandex_disc

        const search_result = await client.searchByTemplate(template);
        
        if (search_result.length){
            const user_node = search_result[0].get(component_user)
<<<<<<< HEAD
            const session_content = client.getLinkContents([user_node])[0].data
            console.log(
                'User with auth_session: ', 
                session_content,
                'already exists!'
            )
=======
            console.log('User found by session link.');
>>>>>>> maxim/feat/yandex_disc
            return user_node
        }
    }
    return null
<<<<<<< HEAD
}
=======
}
>>>>>>> maxim/feat/yandex_disc
