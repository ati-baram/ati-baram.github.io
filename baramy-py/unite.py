# -*- coding: utf-8 -*-
import heapq
import json
import math
import time
from itertools import combinations

from joblib import Parallel, delayed

option_obj = {}
mob_array = []
UNITE_EQUIP_EFFECT = 0
UNITE_OPTION = 1
unite_info = {'수호':[{'보물':[{'일반몬스터 추가피해':50},{'일반몬스터 추가피해':50,'경험치 획득증가':3},{'일반몬스터 추가피해':50,'경험치 획득증가':3,'피해저항관통':50},{'일반몬스터 추가피해':50,'경험치 획득증가':3,'피해저항관통':50,'상태이상저항':70},{'일반몬스터 추가피해':50,'경험치 획득증가':3,'피해저항관통':50,'상태이상저항':70,'피해저항':50}],'전설':[{'위력':150},{'위력':150,'경험치 획득증가':10},{'위력':150,'경험치 획득증가':10,'피해저항관통':100},{'위력':150,'경험치 획득증가':10,'피해저항관통':100,'상태이상저항':150},{'위력':150,'경험치 획득증가':10,'피해저항관통':100,'상태이상저항':150,'피해저항':100}]},{'결의':[{'피해저항':50,'일반몬스터 추가피해':100,'경험치 획득증가':4},{'피해저항':80,'일반몬스터 추가피해':150,'경험치 획득증가':6},{'피해저항':130,'일반몬스터 추가피해':250,'경험치 획득증가':10},{'피해저항':150,'일반몬스터 추가피해':270,'경험치 획득증가':12},{'피해저항':200,'일반몬스터 추가피해':400,'경험치 획득증가':15}],'고요':[{'피해저항':50,'보스몬스터 추가피해':100,'경험치 획득증가':4},{'피해저항':80,'보스몬스터 추가피해':150,'경험치 획득증가':6},{'피해저항':130,'보스몬스터 추가피해':250,'경험치 획득증가':10},{'피해저항':150,'보스몬스터 추가피해':270,'경험치 획득증가':12},{'피해저항':200,'보스몬스터 추가피해':400,'경험치 획득증가':15}],'의지':[{'피해저항':50,'치명피해저항':100,'경험치 획득증가':4},{'피해저항':80,'치명피해저항':150,'경험치 획득증가':6},{'피해저항':130,'치명피해저항':250,'경험치 획득증가':10},{'피해저항':150,'치명피해저항':270,'경험치 획득증가':12},{'피해저항':200,'치명피해저항':400,'경험치 획득증가':15}],'침착':[{'피해저항관통':30,'피해흡수':700,'경험치 획득증가':4},{'피해저항관통':50,'피해흡수':1200,'경험치 획득증가':6},{'피해저항관통':80,'피해흡수':2000,'경험치 획득증가':10},{'피해저항관통':90,'피해흡수':2200,'경험치 획득증가':12},{'피해저항관통':130,'피해흡수':3000,'경험치 획득증가':15}],'냉정':[{'피해저항관통':30,'대인방어':1000,'경험치 획득증가':4},{'피해저항관통':50,'대인방어':1500,'경험치 획득증가':6},{'피해저항관통':80,'대인방어':2500,'경험치 획득증가':10},{'피해저항관통':90,'대인방어':2700,'경험치 획득증가':12},{'피해저항관통':130,'대인방어':4000,'경험치 획득증가':15}],'활력':[{'피해저항관통':30,'시전향상':100,'경험치 획득증가':4},{'피해저항관통':50,'시전향상':150,'경험치 획득증가':6},{'피해저항관통':80,'시전향상':250,'경험치 획득증가':10},{'피해저항관통':90,'시전향상':270,'경험치 획득증가':12},{'피해저항관통':130,'시전향상':400,'경험치 획득증가':15}]}],'탑승':[{'보물':[{'일반몬스터 추가피해':20},{'일반몬스터 추가피해':20,'보스몬스터 추가피해':20},{'일반몬스터 추가피해':20,'보스몬스터 추가피해':20,'피해저항관통':20},{'일반몬스터 추가피해':20,'보스몬스터 추가피해':20,'피해저항관통':20,'상태이상적중':20},{'일반몬스터 추가피해':20,'보스몬스터 추가피해':20,'피해저항관통':20,'상태이상적중':20,'피해저항':20}],'전설':[{'일반몬스터 추가피해':50},{'일반몬스터 추가피해':50,'보스몬스터 추가피해':50},{'일반몬스터 추가피해':50,'보스몬스터 추가피해':50,'피해저항관통':50},{'일반몬스터 추가피해':50,'보스몬스터 추가피해':50,'피해저항관통':50,'상태이상적중':50},{'일반몬스터 추가피해':50,'보스몬스터 추가피해':50,'피해저항관통':50,'상태이상적중':50,'피해저항':50}]},{'결의':[{'마력증가%':1,'치명위력':250,'시전항상':60},{'마력증가%':1,'치명위력':500,'시전항상':90},{'마력증가%':2,'치명위력':750,'시전항상':150},{'마력증가%':2,'치명위력':850,'시전항상':170},{'마력증가%':3,'치명위력':1200,'시전항상':200}],'고요':[{'체력증가%':1,'치명확률':200,'파괴력증가':7000},{'체력증가%':1,'치명확률':400,'파괴력증가':12000},{'체력증가%':2,'치명확률':600,'파괴력증가':15000},{'체력증가%':2,'치명확률':700,'파괴력증가':21000},{'체력증가%':3,'치명확률':1000,'파괴력증가':25000}],'의지':[{'마력증가%':1,'피해흡수':500,'치명피해저항':60},{'마력증가%':1,'피해흡수':700,'치명피해저항':90},{'마력증가%':2,'피해흡수':1200,'치명피해저항':150},{'마력증가%':2,'피해흡수':1300,'치명피해저항':170},{'마력증가%':3,'피해흡수':2000,'치명피해저항':250}],'침착':[{'마력증가%':1,'마력회복향상':3,'피해증가':5},{'마력증가%':1,'마력회복향상':4,'피해증가':7},{'마력증가%':2,'마력회복향상':7,'피해증가':12},{'마력증가%':2,'마력회복향상':8,'피해증가':14},{'마력증가%':3,'마력회복향상':12,'피해증가':20}],'냉정':[{'체력증가%':1,'대인방어':600,'치명위력%':5},{'체력증가%':1,'대인방어':900,'치명위력%':7},{'체력증가%':2,'대인방어':1500,'치명위력%':12},{'체력증가%':2,'대인방어':1700,'치명위력%':14},{'체력증가%':3,'대인방어':2500,'치명위력%':20}],'활력':[{'체력증가%':1,'체력회복향상':3,'위력':50},{'체력증가%':1,'체력회복향상':4,'위력':70},{'체력증가%':2,'체력회복향상':7,'위력':120},{'체력증가%':2,'체력회복향상':8,'위력':140},{'체력증가%':3,'체력회복향상':12,'위력':200}]}],'변신':[{'보물':[{'일반몬스터 추가피해':50},{'일반몬스터 추가피해':50,'피해증가':5},{'일반몬스터 추가피해':50,'피해증가':5,'피해저항관통':50},{'일반몬스터 추가피해':50,'피해증가':5,'피해저항관통':50,'이동속도':1},{'일반몬스터 추가피해':50,'피해증가':5,'피해저항관통':50,'이동속도':1,'피해저항':50}],'전설':[{'마력증가%':3},{'마력증가%':3,'체력증가%':3},{'마력증가%':3,'체력증가%':3,'피해저항관통':100},{'마력증가%':3,'체력증가%':3,'피해저항관통':100,'이동속도':3},{'마력증가%':3,'체력증가%':3,'피해저항관통':100,'이동속도':3,'피해저항':100}]},{'결의':[{'피해저항관통':30,'피해흡수':700,'이동속도':1},{'피해저항관통':50,'피해흡수':1200,'이동속도':1},{'피해저항관통':80,'피해흡수':2000,'이동속도':3},{'피해저항관통':90,'피해흡수':2300,'이동속도':3},{'피해저항관통':130,'피해흡수':3000,'이동속도':4}],'고요':[{'피해저항관통':30,'대인방어':1000,'이동속도':1},{'피해저항관통':50,'대인방어':1500,'이동속도':1},{'피해저항관통':80,'대인방어':2500,'이동속도':3},{'피해저항관통':90,'대인방어':2800,'이동속도':3},{'피해저항관통':130,'대인방어':4000,'이동속도':4}],'의지':[{'피해저항':50,'치명피해저항':120,'이동속도':1},{'피해저항':80,'치명피해저항':200,'이동속도':1},{'피해저항':130,'치명피해저항':300,'이동속도':3},{'피해저항':150,'치명피해저항':370,'이동속도':3},{'피해저항':200,'치명피해저항':450,'이동속도':4}],'침착':[{'피해저항':50,'일반몬스터 추가피해':120,'이동속도':1},{'피해저항':80,'일반몬스터 추가피해':200,'이동속도':1},{'피해저항':130,'일반몬스터 추가피해':300,'이동속도':3},{'피해저항':150,'일반몬스터 추가피해':350,'이동속도':3},{'피해저항':200,'일반몬스터 추가피해':450,'이동속도':4}],'냉정':[{'피해저항관통':30,'시전향상':100,'이동속도':1},{'피해저항관통':50,'시전향상':150,'이동속도':1},{'피해저항관통':80,'시전향상':250,'이동속도':3},{'피해저항관통':90,'시전향상':270,'이동속도':3},{'피해저항관통':130,'시전향상':400,'이동속도':4}],'활력':[{'피해저항':50,'보스몬스터 추가피해':120,'이동속도':1},{'피해저항':80,'보스몬스터 추가피해':200,'이동속도':1},{'피해저항':130,'보스몬스터 추가피해':300,'이동속도':3},{'피해저항':150,'보스몬스터 추가피해':350,'이동속도':3},{'피해저항':200,'보스몬스터 추가피해':450,'이동속도':4}]}]}
priority_info = ['피해저항관통', '피해저항']
pvp_info = ['대인피해%', '대인방어%']

with open('json/rate.json', 'r') as file:
    option_rate = json.load(file)

with open('json/mob.json', 'r') as file:
    for mob in json.load(file):
        mob_array.append(mob)
        option_obj[mob['ic']] = mob['option']

def parse_selected_item(data):
    result = []

    for item in data:
        obj = {
            'ic': item.get('data-id'),
            'name': item.get('data-name'),
            'influence': item.get('data-influence'),
            'type': item.get('data-type'),
            'grade': item.get('data-grade')
        }

        level = 0
        input_level = int(item.get('mob-level', 0))
        if input_level > level:
            level = input_level
        if obj['grade'] == '보물' and level > 15:
            level = 15
        if obj['grade'] == '전설' and level > 25:
            level = 25
        obj['level'] = level

        option = get_option(obj['grade'], option_obj.get(obj['ic'], {}), level)
        obj['option'] = option.get('o')
        obj['equip_option'] = option.get('e')

        result.append(obj)

    return result


def get_option(grade, option, level):
    result = {}
    option_obj = {}
    equip_obj = {}
    is_empty = True

    for key in option.keys():
        value = option[key][level]
        option_obj[key] = value

        if option[key][0] != option[key][15] and is_empty:
            is_empty = False

        rate = get_rate(key, level, grade)

        if rate['roundup'] > 0:
            roundup = 10 ** rate['roundup']
            equip_value = math.floor(round(value * rate['value'] * roundup) / roundup)
        else:
            equip_value = math.floor(value * rate['value'])

        if rate['value'] > 0 and rate['roundup'] <= rate['index'] and equip_value < 1:
            equip_value = 1

        equip_obj[key] = equip_value

    result['o'] = option_obj
    result['e'] = equip_obj
    result['isEmpty'] = is_empty

    return result

def get_rate(key, level, grade):
    rate = 0

    if 5 < level <= 8:
        rate = 1
    elif 8 < level <= 13:
        rate = 2
    elif level > 13:
        rate = 3

    for item in option_rate:
        if item['name'] == key:
            value = item.get(f'rate{rate}{"_t" if grade == "보물" else "_r"}', 0)
            roundup = item.get('roundup', 0)

            if value == '':
                value = 0
            if roundup == '':
                roundup = 0

            return {'index': rate, 'value': value, 'roundup': roundup}

    return {'index': rate, 'value': 0, 'roundup': 0, 'score': 0}


def score_to_dictionary(array, stat):
    result = {}

    for item in array:
        result[item['name']] = item['score']

        if stat == '체력' and '체력' in item['name']:
            result[item['name']] = 0
        elif stat == '마력' and '마력' in item['name']:
            result[item['name']] = 0

    return result


def get_recommend_data(t, pa, pb):
    if len(t) < 6:
        return {}

    combine = list(combinations(t, 6))
    max_sum = 0
    max_score = 0
    max_priority = 0
    max_score_with_priority = 0

    recommend_sum = None
    recommend_score = None
    recommend_priority = None
    recommend_score_with_priority = None

    for combo in combine:
        score_obj = get_score(combo, pa, pb)

        if score_obj['pvp'] > max_sum:
            max_sum = score_obj['pvp']
            recommend_sum = score_obj

        if score_obj['score'] > max_score:
            max_score = score_obj['score']
            recommend_score = score_obj

        if score_obj['priority'] > max_priority:
            max_priority = score_obj['priority']
            recommend_priority = score_obj

        if score_obj['score'] + score_obj['priority'] > max_score_with_priority:
            max_score_with_priority = score_obj['score'] + score_obj['priority']
            recommend_score_with_priority = score_obj

    return {
        'sum': recommend_sum,
        'score': recommend_score,
        'priority': recommend_priority,
        'scoreWithPriority': recommend_score_with_priority
    }


def get_score(arr, pa, pb):
    result = {
        'unit': {},
        'grade': {},
        'priority': 0,
        'sum': 0,
        'pvp': 0,
        'score': 0,
        'count': {
            'unit': {'결의': 0, '고요': 0, '의지': 0, '침착': 0, '냉정': 0, '활력': 0},
            'grade': {'보물': 0, '전설': 0}
        },
        'arr': arr
    }

    unit_obj = {'결의': 0, '고요': 0, '의지': 0, '침착': 0, '냉정': 0, '활력': 0}
    grade_obj = {'보물': 0, '전설': 0}
    score_obj = score_to_dictionary(option_rate, pb)
    type_ = ''

    for item in arr:
        if type_ == '':
            type_ = item['type']

        unit_obj[item['influence']] += 1
        result['count']['unit'][item['influence']] += 1

        grade_obj[item['grade']] += 1
        result['count']['grade'][item['grade']] += 1

        for key, value in item['equip_option'].items():
            if key == pa:
                result['priority'] += value
            if key in priority_info:
                result['sum'] += value
                result['pvp'] += value
            if key in pvp_info:
                result['pvp'] += (value * 10)
            if value > 0 and score_obj[key] > 0:
                result['score'] += value / score_obj[key]

    info = unite_info[type_]

    for k, v in unit_obj.items():
        if v > 1:
            val = info[UNITE_OPTION][k][v - 2]
            for key, value in val.items():
                if key == pa:
                    result['priority'] += value
                if key in priority_info:
                    result['sum'] += value
                    result['pvp'] += value
                if key in pvp_info:
                    result['pvp'] += (value * 10)
                if value > 0 and score_obj[key] > 0:
                    result['score'] += value / score_obj[key]
            unit_obj[k] = val
        else:
            unit_obj[k] = {}

    for k, v in grade_obj.items():
        if v > 1:
            val = info[UNITE_EQUIP_EFFECT][k][v - 2]
            for key, value in val.items():
                if key == pa:
                    result['priority'] += value
                if key in priority_info:
                    result['sum'] += value
                    result['pvp'] += value
                if key in pvp_info:
                    result['pvp'] += (value * 10)
                if value > 0 and score_obj[key] > 0:
                    result['score'] += value / score_obj[key]
            grade_obj[k] = val
        else:
            grade_obj[k] = {}

    unit_obj = {k: v for k, v in unit_obj.items() if v}
    grade_obj = {k: v for k, v in grade_obj.items() if v}

    result['unit'] = unit_obj
    result['grade'] = grade_obj

    return result

def get_simple_score(arr, pa, pb):
    result = 0
    score_obj = score_to_dictionary(option_rate, pb)
    pvp_option = [
        '피해저항관통',
        '피해저항',
        '대인방어%',
        '대인피해%',
        '상태이상저항',
        '상태이상적중',
    ]

    for item in arr:
        for key, value in item['option'].items():
            if value > 0 and score_obj[key] > 0 and key in pvp_option:
                result += value / score_obj[key]

        for key, value in item['equip_option'].items():
            if value > 0 and score_obj[key] > 0 and key in pvp_option:
                result += value / score_obj[key]


    return result

def is_other_influence(array):
    influence = {'결의': 0, '고요': 0, '의지': 0, '침착': 0, '냉정': 0, '활력': 0}
    for i in array:
        influence[i['influence']] += 1

    result = 1
    for key in influence.keys():
        result *= influence[key]

    return result != 1

def get_recommend_top_data(tt, pa, pb):
    t = []

    exclude_mobs = {560, 566}
    for mobs in mob_array:
        mob_ic = int(mobs['ic'])
        if mob_ic not in exclude_mobs and mobs['grade'] == '전설':
            if mobs['type'] == '수호' and tt == 's' and mob_ic > 116:
                t.append(mobs)
            elif mobs['type'] == '변신' and tt == 'b' and mob_ic > 168:
                t.append(mobs)

    result = []
    for obj in t:
        option = get_option(obj['grade'], option_obj[obj['ic']], 25)
        obj['level'] = 25
        obj['option'] = option['o']
        obj['equip_option'] = option['e']
        result.append(obj)

    if len(t) < 6:
        return {}

    # 2365.068661 초 -> 62.052567 초
    for i, data in enumerate(result):
        result[i]['score'] = get_simple_score([data], pa, pb)
        # print(f"{result[i]['name']} : {result[i]['score']}")
        # print(json.dumps(get_score([data], pa, pb), ensure_ascii=False))
        # print(json.dumps(get_simple_score([data], pa, pb), ensure_ascii=False))

    # print(json.dumps(sorted(heapq.nlargest(35, result, key=lambda p: p['score']), key=lambda p: p['score']), ensure_ascii=False))
    result = heapq.nlargest(36, result, key=lambda p: p['score'])
    print(json.dumps(result, ensure_ascii=False))

    start_time = time.time()
    max_array = Parallel(n_jobs=-1)(
        delayed(lambda comb: get_score(comb, pa, pb))(comb) for comb in combinations(result, 6)
    )

    end_time = time.time()
    elapsed_time = end_time - start_time
    print(f"걸린 시간 : {elapsed_time:.6f} 초")

    return json.dumps(heapq.nlargest(20, max_array, key=lambda p:p['pvp']), ensure_ascii=False)
    # return ''

print(get_recommend_top_data('s', '피해저항', '체력'))