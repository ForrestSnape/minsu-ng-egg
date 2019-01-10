import { MockRequest } from '@delon/mock';

function getCitysByProviceId(province_id) {
  let citys = [];
  for (let i = 1; i <= 15; i++) {
    citys.push({
      city_id: i,
      city_name: `城市${i}`
    })
  }
  return {
    code: 0,
    data: citys
  }
}

function getTownList(pi, ps, city_id, search_name) {
  console.dir(pi)
  console.dir(ps)
  console.dir(city_id)
  console.dir(search_name)
  let towns = [];
  for (let i = 1; i <= ps; i++) {
    towns.push({
      town_id: 1,
      town_name: `${i}号小镇`,
      city: {
        city_name: `${i}号城市`
      },
      town_extend: {
        land_area: 1,
        build_area: 1,
        total_invest: 1
      }
    })
  }
  return {
    code: 0,
    data: {
      towns: towns,
      total: 100
    }
  }
}

function getIndustryList(pi, ps) {
  let industries = [];
  for (let i = 1; i <= ps; i++) {
    industries.push({
      industry_id: i,
      industry_name: `${i}号产业`,
      sort: i,
      is_use: i % 2,
      create_time: 1,
      modify_time: 1
    })
  }
  return {
    code: 0,
    data: {
      industries: industries,
      total: 100
    }
  }
}

function getIndustry(industry_id) {
  const industry = {
    industry_id: industry_id,
    industry_name: `${industry_id}号产业`,
    sort: industry_id,
    is_use: industry_id % 2,
    create_time: 1,
    modify_time: 1
  }
  return {
    code: 0,
    data: industry
  }
}

function addIndustry(params) {
  console.dir(params)
  return {
    code: 0,
    data: true
  }
}

function editIndustry(params) {
  console.dir(params)
  return {
    code: 0,
    data: true
  }
}

function delIndustry(industry_id) {
  console.dir(industry_id)
  return {
    code: 0,
    data: true
  }
}

function article_categories() {
  let categories = [
    {
      category_id: 1, pid: 0, name: '新闻资讯', sort: 0, children: [
        { category_id: 2, pid: 1, name: '全国新闻', sort: 0, children: [] },
        {
          category_id: 3, pid: 1, name: '地方新闻', sort: 0, children: [
            { category_id: 4, pid: 3, name: '小镇新闻', sort: 0, children: [] },
            { category_id: 5, pid: 3, name: '小村新闻', sort: 0, children: [] },
            { category_id: 6, pid: 3, name: '小社新闻', sort: 0, children: [] }
          ]
        },
      ]
    },
    {
      category_id: 7, pid: 0, name: '奇闻轶事', sort: 0, children: [
        {
          category_id: 8, pid: 7, name: '地方轶事', sort: 0, children: [
            { category_id: 9, pid: 8, name: '小镇轶事', sort: 0, children: [] }
          ]
        }
      ]
    },
  ];
  return {
    code: 0,
    data: categories
  }
}

function getArticleCategory(req, category_id) {
  console.dir(req)
  const category = {
    category_id: category_id,
    pid: category_id - 1,
    name: `${category_id}号分类`,
    sort: category_id,
  };
  return {
    code: 0,
    data: category
  }
}

function addArticleCategory(params) {
  console.dir(params)
  return {
    code: 0,
    data: true
  }
}

function editArticleCategory(params) {
  console.dir(params)
  return {
    code: 0,
    data: true
  }
}

function delArticleCategory(category_id) {
  console.dir(category_id)
  return {
    code: 0,
    data: true
  }
}

function getArticleList(pi, ps, category_id, date_range, search_text) {
  const total = 100;
  console.dir(date_range)
  let articles = [];
  for (let i = 0; i < total; i++) {
    articles.push({
      article_id: i,
      title: `${i}号文章`,
      article_class: {
        category_id: 1,
        class_name: `新闻资讯`
      },
      author: `Forrest`,
      click: i * 1000,
      create_time: 1545614857,
      modify_time: 1545614857,
      status: i % 2
    })
  }
  let res = [];
  let b = (pi - 1) * ps;
  let e = b + ps - 1;
  articles.forEach(item => {
    if ((b <= item.article_id) && (item.article_id <= e)) {
      res.push(item);
    }
  });
  return {
    code:0,
    data:{
      articles:res,
      total:total
    }
  }
}

export const APIS = {
  '/api/citys': (req: MockRequest) => getCitysByProviceId(req.queryString.province_id),
  '/api/town/list': (req: MockRequest) => getTownList(req.queryString.pi, req.queryString.ps, req.queryString.city_id, req.queryString.search_name),

  '/api/industry/list': (req: MockRequest) => getIndustryList(req.queryString.pi, req.queryString.ps),
  '/api/industry': (req: MockRequest) => getIndustry(req.queryString.industry_id),
  'POST /api/industry/add': (req: MockRequest) => addIndustry(req.body),
  'PUT /api/industry/edit': (req: MockRequest) => editIndustry(req.body),
  'DELETE /api/industry/del': (req: MockRequest) => delIndustry(req.queryString.industry_id),

  '/api/article/category/list': () => article_categories(),
  '/api/article/category': (req: MockRequest) => getArticleCategory(req, req.queryString.category_id),
  'POST /api/article/category/add': (req: MockRequest) => addArticleCategory(req.body),
  'PUT /api/article/category/edit': (req: MockRequest) => editArticleCategory(req.body),
  'DELETE /api/article/category/del': (req: MockRequest) => delArticleCategory(req.queryString.category_id),

  '/api/article/list': (req: MockRequest) => getArticleList(req.queryString.pi, req.queryString.ps, req.queryString.category_id, req.queryString.date_range, req.queryString.search_text),
};
