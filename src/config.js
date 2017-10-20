export class Config {
    //TestAPI
        // I believe this is the old TestAPI: (This DOESN'T work)
        // static API =  'http://ec2-13-58-239-116.us-east-2.compute.amazonaws.com'
        // This is the new one:
        // This DOES work
    // static API =  'http://ec2-18-221-133-185.us-east-2.compute.amazonaws.com'
    //LocalHostAPI
    // static API = 'http://localhost:10000'
    //productionAPI
    static API = 'https://xprincipiabeta.com'
        // Here I'm also going to try the ec2 address for the normal xp_api:
        // It DOESN'T work
        // static API =  'http://ec2-13-59-232-38.us-east-2.compute.amazonaws.com'
        // Here I'm trying ec2 address of xp_frontend:
        // This ALSO doesn't work
        // static API =  'http://ec2-18-220-64-198.us-east-2.compute.amazonaws.com'
    //ChatAPI
    // static CHATAPI = 'http://ec2-18-221-66-130.us-east-2.compute.amazonaws.com'
}
