import json
import math

# filtered_familiar_data.json 파일을 불러옵니다.
with open('filtered_familiar_data.json', 'r', encoding='utf-8') as infile:
    data = json.load(infile)

# 결속효과를 계산하여 새로운 리스트로 변환
linked_data = []
for item in data:
    # 'option' 내의 모든 값을 25%로 계산하여 소수점 버리기
    for key, value in item['option'].items():
        if isinstance(value, int):
            # 결속효과 계산 (값의 25%, 소수점 버리기)
            bound_effect = math.floor(value * 0.25)
            item['option'][key] = bound_effect
    
    # 수정된 항목을 linked_data 리스트에 추가
    linked_data.append(item)

# linked_data.json 파일로 저장
with open('linked_data.json', 'w', encoding='utf-8') as outfile:
    json.dump(linked_data, outfile, ensure_ascii=False, indent=4)

print("linked_data.json 파일로 저장 완료!")
