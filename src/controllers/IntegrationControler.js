import Opportunity from "../models/Opportunity";
import bling from "../services/bling";
import pipedrive from "../services/pipedrive";

//Create sales class by Pipedrive to Bling
class IntegrationController {
  async index(req, res) {
    const blingKey = process.env.BLING;

    const response = await pipedrive.get();

    //Get sales
    const deals = response.data.data.map(
      ({ id, title, status, value, won_time }) => ({
        id,
        title,
        status,
        value,
        won_time,
      })
    );

    //Create sales
    const result = await deals.map(({ title, status, value, won_time }) => {
      Opportunity.create({
        title,
        status,
        value,
        won_time,
      });

      bling.post(
        `pedido/json/?apikey=${blingKey}&xml=
        
        ${encodeURI(`<?xml version="1.0" encoding="utf-8"?>
        <pedido>
            <cliente>
                <nome>${title}</nome>
                <tipoPessoa>TipoPessoa</tipoPessoa>
                <endereco>Endereco</endereco>
                <cpf_cnpj>00000000000000</cpf_cnpj>
                <ie_rg>0000000000</ie_rg>
                <numero>000</numero>
                <complemento>Complemento</complemento>
                <bairro>Bairro</bairro>
                <cep>00000000</cep>
                <cidade>Cidade</cidade>
                <uf>SP</uf>
                <fone>0000000000</fone>
                <email>kevinchieft@gmail.com</email>
            </cliente>
            <transporte>
                <transportadora>Transportadora</transportadora>
                <tipo_frete>A</tipo_frete>
                <servico_correios>Servico COrreios</servico_correios>
                <dados_etiqueta>
                    <nome>Name</nome>
                    <endereco>Endereco</endereco>
                    <numero>00</numero>
                    <complemento>Complemento</complemento>
                    <municipio>Municipio</municipio>
                    <uf>SP</uf>
                    <cep>00000000</cep>
                    <bairro>Bairro</bairro>
                </dados_etiqueta>
                <volumes>
                    <volume>
                        <servico>Servico</servico>
                        <codigoRastreamento></codigoRastreamento>
                    </volume>
                </volumes>
            </transporte>
            <itens>
                <item>
                    <codigo>01</codigo>
                    <descricao>Descricao</descricao>
                    <un>Pç</un>
                    <qtde>1</qtde>
                    <vlr_unit>0.01</vlr_unit>
                </item>
            </itens>
            <parcelas>
                <parcela>
                    <data>10/10/2020</data>
                    <vlr>${value}</vlr>
                    <obs>Obs</obs>
                </parcela>
            </parcelas>
            <vlr_frete>10</vlr_frete>
            <vlr_desconto>10</vlr_desconto>
            <obs>Obs</obs>
            <obs_internas>Obs</obs_internas>
      </pedido>`)}`
      );
    });

    return res.json({ deals, status: result ? "sucess" : "fail" });
  }
}

export default new IntegrationController();
