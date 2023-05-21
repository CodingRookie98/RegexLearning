import json

# 读取 TopicInfo.json 文件
with open('TopicInfo.json', 'r', encoding="utf-8") as file:
    data = json.load(file)

# 遍历每个项并添加 "group" 值
for item in data["topicInfoArray"]:
    item["group"] = "A"

# 将更新后的数据写入新文件 TopicInfo_new.json
with open('TopicInfo_new.json', 'w', encoding="utf-8") as file:
    json.dump(data, file, ensure_ascii=False)
