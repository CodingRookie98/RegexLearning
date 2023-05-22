# import json

# # 读取 TopicInfo.json 文件
# with open('cheatSheet_new.json', 'r', encoding="utf-8") as file:
#     data = json.load(file)

# # 遍历每个项并添加 "group" 值
# for item in data["quantifiersAndAlternation"]:
#     item["text"] = ""
#     item["pattern"] = ""

# # 将更新后的数据写入新文件 TopicInfo_new.json
# with open('cheatSheet_new.json', 'w', encoding="utf-8") as file:
#     json.dump(data, file, ensure_ascii=False)

import json

# 读取TopicInfo.json文件
with open('TopicInfo_old.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# 遍历topicInfoArray数组
for item in data['topicInfoArray']:
    # 删除title属性值中的单引号符号
    item['title'] = item['title'].replace("`", "")

# 保存修改后的数据回TopicInfo.json文件
with open('TopicInfo.json', 'w', encoding='utf-8') as file:
    json.dump(data, file, indent=4, ensure_ascii=False)
