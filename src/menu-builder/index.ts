import { ClientOpts, createClient, RedisClient } from 'redis';
import { RequestBody } from './typings/global';
import languages from './lang';
import configs from './configs';

const redisOptions: ClientOpts = {

};

const redis: RedisClient = createClient(redisOptions);

export default function (args: RequestBody) {
  return new Promise<void>(async (resolve, reject) => {
    try {

      const buildInput = {
        current_input: args.text,
        full_input: args.text,
        masked_input: args.text,
        active_state: configs.start_state,
        sid: configs.session_prefix + args.sessionId,
        language: configs.default_lang,
        phone: args.phoneNumber,
        hash: "",
      };

      resolve("CON Welcome to the USSD Redis App");
      return;

    } catch (e) {
 
      reject("END " + languages[configs.default_lang].generic.fatal_error);
      return;
    }
  });
}
