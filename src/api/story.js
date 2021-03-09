import { dummyDataStory } from "../dummy/storyDummy";

export async function getStoryList() {
  // Generic 을 통해 응답 데이터의 타입을 설정 할 수 있습니다.
  //   const response = await axios.get<ServerCount>(`https://api.github.com/users/${username}`);
  //   return response.data; // 데이터 값을 바로 반환하도록 처리합니다.

  const StoryList = dummyDataStory;
  return StoryList;
}