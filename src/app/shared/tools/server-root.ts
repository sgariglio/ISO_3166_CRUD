export abstract class Server_Config {

  public static app_name: string = "TSC";

  //TESTING
  public static urlApi: string = 'https://localhost:44342';
  public static runningOnProd = false

  //PROD
  // public static urlApi: string = 'https://server.browell.ar/ndp';
  // public static urlApiSeguridad: string = 'https://server.browell.ar/web_api_seguridad';
  // public static runningOnProd = true


  //TEST MODE (NO PROD)
  // if (!Server_Config.runningOnProd) {
}
