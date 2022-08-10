import http from "../http-common";

const getAll = () => {
  return http.get("/fiscalias");
};

const get = id => {
  return http.get(`/fiscalias/${id}`);
};

const create = data => {
  return http.post("/fiscalias", data);
};

const update = (id, data) => {
  return http.put(`/fiscalias/${id}`, data);
};

const remove = id => {
  return http.delete(`/fiscalias/${id}`);
};

const removeAll = () => {
  return http.delete(`/fiscalias`);
};

const findByAgencia = agencia => {
  return http.get(`/fiscalias?agencia=${agencia}`);
};


const FiscaliaService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByAgencia
};

export default FiscaliaService;