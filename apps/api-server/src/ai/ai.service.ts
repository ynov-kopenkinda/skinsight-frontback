import { Injectable } from "@nestjs/common";
import Replicate from "replicate";

@Injectable()
export class AiService {
  constructor() {}
  replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });
  async askAI(image_url: string, question: string) {
    const response = (await this.replicate.run(
      "andreasjansson/blip-2:f677695e5e89f8b236e52ecd1d3f01beb44c34606419bcc19345e046d8f786f9",
      {
        input: {
          image:
            "https://replicate.delivery/pbxt/IJEPmgAlL2zNBNDoRRKFegTEcxnlRhoQxlNjPHSZEy0pSIKn/gg_bridge.jpeg",
          question: question,
        },
      },
    )) as unknown as string;
    console.log(response);
    return response;
  }

  async askIfAppointmentNeeded(image_url: string) {
    let warningCounter = 0;
    (await this.askAI(image_url, "Is this a mole?")) === "yes" &&
      warningCounter++;
    (await this.askAI(
      image_url,
      "Does the mole have irregular or poorly defined borders?",
    )) === "yes" && warningCounter++;
    (await this.askAI(image_url, "Is the mole asymmetrical?")) === "yes" &&
      warningCounter++;
    (await this.askAI(
      image_url,
      "Does the mole have an uneven or irregular color?",
    )) === "yes" && warningCounter++;
    (await this.askAI(
      image_url,
      "Is the mole accompanied by symptoms such as itching, tenderness, or bleeding?",
    )) && warningCounter++;

    if (warningCounter > 0 && warningCounter < 3) {
      return "It seems that you don't have risks, but to be sure, you can still see a doctor";
    } else if (warningCounter === 3) {
      return "You should see a doctor soon, you have moderate risks";
    } else {
      return "You should see a doctor as soon as possible";
    }
  }
}
