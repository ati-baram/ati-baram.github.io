import json
import math

# 결속 효과 계산 함수
def calculate_bound_effect(option, value, level):
    percentage = 0

    # 대인방어, 대인피해, 위력, 체력증가, 마력증가
    if option in ["대인방어", "대인피해", "위력", "체력증가", "마력증가"]:
        percentage = 0.05 if level < 9 else 0.15 if level < 14 else 0.20
    elif option == "이동속도":
        # 이동속도
        percentage = 0.05 if level < 9 else 0.05 if level < 14 else 0.10
    elif option in ["체력증가%", "마력증가%"]:
        # 체력증가%, 마력증가%
        percentage = 0 if level < 14 else 0.052
    elif option in ["체력회복향상", "마력회복향상", "경험치 획득증가", "전리품 획득증가"]:
        # 회복 향상, 경험치, 전리품 획득
        if level < 9:
            percentage = 0.02
        elif level < 14:
            percentage = 0.045
        else:
            return math.floor(value / 14.2)
    else:
        # 기본 비율 적용
        percentage = 0.05 if level < 9 else 0.15 if level < 14 else 0.25
    
    return math.floor(value * percentage)  # 내림 처리

def filter_and_apply_effect(input_json, level):
    # level이 25일 경우만 처리
    if level != 25:
        return

    # 입력 데이터를 파싱
    with open(input_json, 'r', encoding='utf-8') as file:
        data = json.load(file)

    filtered_data = []

    for item in data:
        if item["type"] == "탑승":
            continue
        
        filtered_item = {
            "grade": item["grade"],
            "type": item["type"],
            "influence": item["influence"],
            "name": item["name"],
            "ic": item["ic"],
            "option": {}
        }

        for key in ["피해저항관통", "피해저항", "대인피해%", "대인방어%"]:
            # 값이 있으면 마지막 값 추출하고, 없다면 0
            if key in item["option"] and item["option"][key]:
                last_value = item["option"][key][-1]
                bound_effect = calculate_bound_effect(key, last_value, level)
                filtered_item["option"][key] = [bound_effect]
            else:
                filtered_item["option"][key] = [0]
        
        filtered_data.append(filtered_item)
    
    # 결과를 새로운 JSON 파일로 저장
    with open('filtered_and_effected_familiar_data_level25.json', 'w', encoding='utf-8') as outfile:
        json.dump(filtered_data, outfile, ensure_ascii=False, indent=4)

# 함수 실행 예시 (level=25로 설정)
filter_and_apply_effect('familiar_data.json', 25)
