import json

# 원본 데이터 로드
with open("familiar_data.json", "r", encoding="utf-8") as f:
    familiar_data = json.load(f)

# 필요한 옵션만 남기고 정제하는 함수
def filter_familiar_data(data):
    filtered_data = []
    target_options = ["피해저항관통", "피해저항", "대인피해%", "대인방어%"]
    level_index = 25  # 25레벨 값 사용
    
    for familiar in data:
        filtered_options = {}
        
        # 대상 옵션 중 존재하는 것만 추가
        for option in target_options:
            values = familiar["option"].get(option, [])  # 옵션이 없으면 빈 리스트 반환
            if len(values) > level_index:  # 25레벨 값이 존재하는 경우만 추가
                filtered_options[option] = values[level_index]
        
        # 옵션이 하나라도 존재하는 경우만 추가
        if filtered_options:
            filtered_familiar = {
                "grade": familiar["grade"],
                "type": familiar["type"],
                "influence": familiar["influence"],
                "name": familiar["name"],
                "ic": familiar["ic"],
                "option": filtered_options
            }
            filtered_data.append(filtered_familiar)
    
    return filtered_data

# 데이터 필터링
filtered_familiar_data = filter_familiar_data(familiar_data)

# 결과 저장
with open("filtered_familiar_data.json", "w", encoding="utf-8") as f:
    json.dump(filtered_familiar_data, f, ensure_ascii=False, indent=4)

print("필터링 완료!")
