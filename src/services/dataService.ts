import { Topic, CheatSheetItem } from '../types';
import topicData from '../assets/data/TopicInfo.json';
import cheatSheetData from '../assets/data/cheatSheet.json';

export class DataService {
  static async getTopics(): Promise<Topic[]> {
    return Promise.resolve(topicData.topicInfoArray as Topic[]);
  }

  static async getCheatSheet(): Promise<CheatSheetItem[]> {
    return Promise.resolve(cheatSheetData.cheatSheetArray as CheatSheetItem[]);
  }

  static async getTopicById(id: number): Promise<Topic | undefined> {
    const topics = await this.getTopics();
    return topics.find((t) => t.id === id);
  }
}