<template>
  <div>
<div style="margin: 15px;" class="widget-body">
        <div class="panel-group smart-accordion-default" id="accordion">
          <div v-if="profile.map['reports'].includes('entries')" class="panel panel-default">
            <div class="panel-heading">
              <h4 class="panel-title">
                <a @click="clear_all" data-toggle="collapse" data-parent="#accordion" href="#c1" class="collapsed">
                  <i class="fa fa-lg fa-angle-up pull-right"></i>
                  <i class="fa fa-lg fa-angle-down pull-right"></i>
                   <span>
                     <i class="fa fa-lg fa-sign-in"></i> Entrada de Veículos
                   </span>
                </a>
              </h4>
            </div>
            <div id="c1" class="panel-collapse collapse">
              <form class="smart-form" novalidate="novalidate">

              <fieldset>
                <div v-if="registry.length > 0" class="row">
                  <section class="col col-6">
                    <label class="input"> Valor Total de Aquisições
                      <input type="text" :value="entries_values.total_mean_price" disabled="disabled">
                    </label>
                  </section>
                  <section class="col col-6">
                    <label class="input"> Valor Total de Vendas
                      <input type="text" :value="entries_values.total_sale_price" disabled="disabled">
                    </label>
                  </section>
                </div>
                <div class="row">
                  <section class="col col-6">
                    <label class="input"> <i class="icon-append fa fa-calendar"></i>
                      <masked-input  @input="validateEntries('entries')" v-model="date_entries_first" placeholder="Data inicial" type="text" autocomplete="off" name="date" mask="11/11/1111"></masked-input>
                    </label>
                  </section>
                  <section class="col col-6">
                    <label class="input"> <i class="icon-append fa fa-calendar"></i>
                      <masked-input  @input="validateEntries('entries')" v-model="date_entries_end" placeholder="Data final" type="text" autocomplete="off" name="date" mask="11/11/1111"></masked-input>
                    </label>
                  </section>
                  <section class="col col-12">
                    <div class="inline-group">
                      <template v-for="tenant in tenants">
                        <label class="checkbox">
                        <!-- :disabled="formReadonly" v-model="userTenants" -->
                          <input @change="validateEntries('entries')" v-model="entries_tenant" :value="tenant.id_key" type="checkbox" name="checkbox-inline">
                          <i></i> {{ tenant.tenant_name }}
                        </label>
                      </template>
                    </div>
                  </section>
                </div>
              </fieldset>
            </form>
              <div style="margin-top:10px; margin-bottom: 10px;" class="panel-body no-padding">
                <table class="table table-bordered table-condensed">
                  <thead>
                    <tr>
                      <th>Data de Aquisição</th>
                      <th>Marca</th>
                      <th>Modelo</th>
                      <th>Ano Fab/Ano Modelo</th>
                      <th>Cor</th>
                      <th>Placa</th>
                      <th>Valor da Aquisição</th>
                      <th>Valor de Venda</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="entry in registry">
                      <td>{{ entry.acquisition_date }}</td>
                      <td>{{ entry.fipe_brand }}</td>
                      <td>{{ entry.fipe_model }}</td>
                      <td>{{ entry.fabrication_year }}</td>
                      <td>{{ entry.color }}</td>
                      <td>{{ entry.plate }}</td>
                      <td>{{ entry.mean_price }}</td>
                      <td>{{ entry.sale_price }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div v-if="profile.map['reports'].includes('sales')" class="panel panel-default">
            <div class="panel-heading">
              <h4 class="panel-title">
                <a @click="clear_all" data-toggle="collapse" data-parent="#accordion" href="#c2" class="collapsed">
                  <i class="fa fa-lg fa-angle-up pull-right"></i>
                  <i class="fa fa-lg fa-angle-down pull-right"></i>
                   <span>
                     <i class="fa fa-lg fa-sign-out"></i> Vendas
                   </span>
                </a>
              </h4>
            </div>
            <div id="c2" class="panel-collapse collapse">
              <form class="smart-form" novalidate="novalidate">

              <fieldset>
                <div v-if="registry.length > 0" class="row">
                  <section class="col col-6">
                    <label class="input"> Valor Total de Aquisições
                      <input type="text" :value="entries_values.total_mean_price" disabled="disabled">
                    </label>
                  </section>
                  <section class="col col-6">
                    <label class="input"> Valor Total de Vendas
                      <input type="text" :value="entries_values.total_sale_price" disabled="disabled">
                    </label>
                  </section>
                </div>
                <div class="row">
                  <section class="col col-6">
                    <label class="input"> <i class="icon-append fa fa-calendar"></i>
                      <masked-input  @input="validateEntries('sales')" v-model="date_sales_first" placeholder="Data inicial" type="text" autocomplete="off" name="date" mask="11/11/1111"></masked-input>
                    </label>
                  </section>
                  <section class="col col-6">
                    <label class="input"> <i class="icon-append fa fa-calendar"></i>
                      <masked-input  @input="validateEntries('sales')" v-model="date_sales_end" placeholder="Data final" type="text" autocomplete="off" name="date" mask="11/11/1111"></masked-input>
                    </label>
                  </section>
                  <section class="col col-12">
                    <div class="inline-group">
                      <template v-for="tenant in tenants">
                        <label class="checkbox">
                        <!-- :disabled="formReadonly" v-model="userTenants" -->
                          <input @change="validateEntries('sales')" v-model="entries_tenant" :value="tenant.id_key" type="checkbox" name="checkbox-inline">
                          <i></i> {{ tenant.tenant_name }}
                        </label>
                      </template>
                    </div>
                  </section>
                </div>
              </fieldset>
            </form>
              <div style="margin-top:10px; margin-bottom: 10px;" class="panel-body no-padding">
                <table class="table table-bordered table-condensed">
                  <thead>
                    <tr>
                      <th>Data da Venda</th>
                      <th>Marca</th>
                      <th>Modelo</th>
                      <th>Ano Fab/Ano Modelo</th>
                      <th>Cor</th>
                      <th>Placa</th>
                      <th>Valor da Aquisição</th>
                      <th>Valor Vendido</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="entry in registry">
                      <td>{{ entry.creation_date }}</td>
                      <td>{{ entry.fipe_brand }}</td>
                      <td>{{ entry.fipe_model }}</td>
                      <td>{{ entry.fabrication_year }}</td>
                      <td>{{ entry.color }}</td>
                      <td>{{ entry.plate }}</td>
                      <td>{{ entry.mean_price }}</td>
                      <td>{{ entry.sale_price }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div v-if="profile.map['reports'].includes('stock')" class="panel panel-default">
            <div class="panel-heading">
              <h4 class="panel-title">
                <a @click="clear_all" data-toggle="collapse" data-parent="#accordion" href="#c3" class="collapsed">
                  <i class="fa fa-lg fa-angle-up pull-right"></i>
                  <i class="fa fa-lg fa-angle-down pull-right"></i>
                   <span>
                     <i class="fa fa-lg fa-car"></i> Estoque parado
                   </span>
                </a>
              </h4>
            </div>
            <div id="c3" class="panel-collapse collapse">
              <form class="smart-form" novalidate="novalidate">

              <fieldset>
                <div class="row">
                  <section class="col col-6">
                    <label class="input"> <i class="icon-append fa fa-calendar"></i>
                      <masked-input  @input="validateEntries('stopped_entries')" v-model="date_stopped_entries_first" placeholder="Data inicial" type="text" autocomplete="off" name="date" mask="11/11/1111"></masked-input>
                    </label>
                  </section>
                  <section class="col col-6">
                    <label class="input"> <i class="icon-append fa fa-calendar"></i>
                      <masked-input  @input="validateEntries('stopped_entries')" v-model="date_stopped_entries_end" placeholder="Data final" type="text" autocomplete="off" name="date" mask="11/11/1111"></masked-input>
                    </label>
                  </section>
                  <section class="col col-12">
                    <div class="inline-group">
                      <template v-for="tenant in tenants">
                        <label class="checkbox">
                        <!-- :disabled="formReadonly" v-model="userTenants" -->
                          <input @change="validateEntries('stopped_entries')" v-model="entries_tenant" :value="tenant.id_key" type="checkbox" name="checkbox-inline">
                          <i></i> {{ tenant.tenant_name }}
                        </label>
                      </template>
                    </div>
                  </section>
                </div>
              </fieldset>
            </form>
              <div style="margin-top:10px; margin-bottom: 10px;" class="panel-body no-padding">
                <table class="table table-bordered table-condensed">
                  <thead>
                    <tr>
                      <th>Criado em</th>
                      <th>Marca</th>
                      <th>Modelo</th>
                      <th>Ano Fab/Ano Modelo</th>
                      <th>Cor</th>
                      <th>Placa</th>
                      <th>Valor da Aquisição</th>
                      <th>Valor de Venda</th>
                      <th>Parado há</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="entry in registry">
                      <td>{{ entry.creation_date }}</td>
                      <td>{{ entry.fipe_brand }}</td>
                      <td>{{ entry.fipe_model }}</td>
                      <td>{{ entry.fabrication_year }}</td>
                      <td>{{ entry.color }}</td>
                      <td>{{ entry.plate }}</td>
                      <td>{{ entry.mean_price }}</td>
                      <td>{{ entry.sale_price }}</td>
                      <td>{{ entry.due }} dias</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div v-if="profile.map['reports'].includes('pendencies')" class="panel panel-default">
            <div class="panel-heading">
              <h4 class="panel-title">
                <a @click="clear_all" data-toggle="collapse" data-parent="#accordion" href="#c4" :class="{'collapsed': current !== 'pendencies'}">
                  <i class="fa fa-lg fa-angle-up pull-right"></i>
                  <i class="fa fa-lg fa-angle-down pull-right"></i>
                   <span>
                     <i class="fa fa-lg fa-warning"></i> Pendências
                   </span>
                </a>
              </h4>
            </div>
            <div id="c4" class="panel-collapse collapse" :class="{'in': current === 'pendencies'}">
              <form class="smart-form" novalidate="novalidate">

              <fieldset>
                <div class="row">
                  <section class="col col-6">
                    <label class="input"> <i class="icon-append fa fa-calendar"></i>
                      <masked-input  @input="validateEntries('pendencies')" v-model="date_pendencies_first" placeholder="Data inicial" type="text" autocomplete="off" name="date" mask="11/11/1111"></masked-input>
                    </label>
                  </section>
                  <section class="col col-6">
                    <label class="input"> <i class="icon-append fa fa-calendar"></i>
                      <masked-input  @input="validateEntries('pendencies')" v-model="date_pendencies_end" placeholder="Data final" type="text" autocomplete="off" name="date" mask="11/11/1111"></masked-input>
                    </label>
                  </section>
                  <section class="col col-12">
                    <div class="inline-group">
                      <template v-for="tenant in tenants">
                        <label class="checkbox">
                        <!-- :disabled="formReadonly" v-model="userTenants" -->
                          <input @change="validateEntries('pendencies')" v-model="entries_tenant" :value="tenant.id_key" type="checkbox" name="checkbox-inline">
                          <i></i> {{ tenant.tenant_name }}
                        </label>
                      </template>
                    </div>
                  </section>
                </div>
              </fieldset>
            </form>
              <div style="margin-top:10px; margin-bottom: 10px;" class="panel-body no-padding">
                <table class="table table-bordered table-condensed">
                  <thead>
                    <tr>
                      <!-- <th>Criado em</th> -->
                      <th>Marca</th>
                      <th>Modelo</th>
                      <!-- <th>Ano Fab/Ano Modelo</th> -->
                      <!-- <th>Cor</th> -->
                      <th>Placa</th>
                      <!-- <th>Valor da Aquisição</th> -->
                      <!-- <th>Valor de Venda</th> -->
                      <th>Pendências</th>
                      <th>Ver detalhes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="entry in registry">
                      <!-- <td>{{ entry.creation_date }}</td> -->
                      <td>{{ entry.fipe_brand }}</td>
                      <td>{{ entry.fipe_model }}</td>
                      <!-- <td>{{ entry.fabrication_year }}</td> -->
                      <!-- <td>{{ entry.color }}</td> -->
                      <td>{{ entry.plate }}</td>
                      <!-- <td>{{ entry.mean_price }}</td> -->
                      <!-- <td>{{ entry.sale_price }}</td> -->
                      <td>{{ entry.total }}</td>
                      <td>
                        <button @click="$router.push({ path: '/vehicle-entry/' + entry.id + '/edit'})" class="btn btn-sm btn-default">
                            Verificar pendências
                          </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div v-if="profile.map['reports'].includes('sales-by-user')" class="panel panel-default">
            <div class="panel-heading">
              <h4 class="panel-title">
                <a @click="clear_all" data-toggle="collapse" data-parent="#accordion" href="#c5" :class="{'collapsed': current !== 'employee-sales'}">
                  <i class="fa fa-lg fa-angle-up pull-right"></i>
                  <i class="fa fa-lg fa-angle-down pull-right"></i>
                   <span>
                     <i class="fa fa-lg fa-user"></i> Vendas Por Vendedor
                   </span>
                </a>
              </h4>
            </div>
            <div id="c5" class="panel-collapse collapse" :class="{'in': current === 'employee-sales'}">
              <form class="smart-form" novalidate="novalidate">

              <fieldset>
                <div class="row">
                  <section class="col col-md-6">
                    <label class="input"> <i class="icon-append fa fa-calendar"></i>
                      <masked-input  @input="validateEntries('employee-sales')" v-model="date_employee_sales_first" placeholder="Data inicial" type="text" autocomplete="off" name="date" mask="11/11/1111"></masked-input>
                    </label>
                  </section>
                  <section class="col col-md-6">
                    <label class="input"> <i class="icon-append fa fa-calendar"></i>
                      <masked-input  @input="validateEntries('employee-sales')" v-model="date_employee_sales_end" placeholder="Data final" type="text" autocomplete="off" name="date" mask="11/11/1111"></masked-input>
                    </label>
                  </section>
                  <section class="col col-md-12">
                    <label class="input"> <i class="icon-append fa fa-calendar"></i>
                      <select @change="validateEntries('employee-sales')" v-model="employee_sales_user" class="form-control">
                        <option value="all">Todos</option>
                        <option :value="employee.id_key" v-for="employee in employees_sales_list">
                          {{ employee.name }} ({{ employee.login }})
                        </option>
                      </select>
                    </label>
                  </section>
                  <section class="col col-12">
                    <div class="inline-group">
                      <template v-for="tenant in tenants">
                        <label class="checkbox">
                        <!-- :disabled="formReadonly" v-model="userTenants" -->
                          <input @change="validateEntries('employee-sales')" v-model="entries_tenant" :value="tenant.id_key" type="checkbox" name="checkbox-inline">
                          <i></i> {{ tenant.tenant_name }}
                        </label>
                      </template>
                    </div>
                  </section>
                </div>
              </fieldset>
            </form>
              <div style="margin-top:10px; margin-bottom: 10px;" class="panel-body no-padding">
                <table class="table table-bordered table-condensed">
                  <thead>
                    <tr>
                      <!-- <th>Criado em</th> -->
                      <th>Nome</th>
                      <!-- <th>Login</th> -->
                      <th>Vendas</th>
                      <!-- <th>Ano Fab/Ano Modelo</th> -->
                      <!-- <th>Cor</th> -->
                      <th>Total Vendido</th>
                      <!-- <th>Valor da Aquisição</th> -->
                      <!-- <th>Valor de Venda</th> -->
                      <th>Comissão Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="current === 'employee-sales'" v-for="entry in registry">
                      <td>{{entry[0].name}}</td>
                      <!-- <td>{{entry[0].login}}</td> -->
                      <td>
                        <div v-for="sale in entry">
                        {{sale.fipe_vehicle}} - PLACA: {{ sale.plate }} | <span class="label label-success">Total da Venda: {{numeral(sale.total).format('$ 0,0.00')}}</span>
                        <label class="label label-info">
                           Comissão: {{ numeral(sale.commission).format('$ 0,0.00') }}
                        </label>
                        </div>
                      </td>
                      <td>{{ numeral(entry[0].total_geral).format('$ 0,0.00') }}</td>
                      <td>{{ numeral(entry[0].comission_geral).format('$ 0,0.00') }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <!-- Falta trocar a permissão para a correta -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4 class="panel-title">
                <a @click="clear_all" data-toggle="collapse" data-parent="#accordion" href="#c6" :class="{'collapsed': current !== 'expenses-vehicles'}">
                  <i class="fa fa-lg fa-angle-up pull-right"></i>
                  <i class="fa fa-lg fa-angle-down pull-right"></i>
                   <span>
                     <i class="fa fa-lg fa-money"></i> Despesas de Veículos
                   </span>
                </a>
              </h4>
            </div>
            <div id="c6" class="panel-collapse collapse" :class="{'in': current === 'expenses-vehicles'}">
              <form class="smart-form" novalidate="novalidate">

              <fieldset>
                <div class="row">
                  <section class="col col-md-6">
                    <label class="input"> <i class="icon-append fa fa-calendar"></i>
                      <masked-input  @input="validateEntries('expenses-vehicles')" v-model="date_vehicle_expenses_first" placeholder="Data inicial" type="text" autocomplete="off" name="date" mask="11/11/1111"></masked-input>
                    </label>
                  </section>
                  <section class="col col-md-6">
                    <label class="input"> <i class="icon-append fa fa-calendar"></i>
                      <masked-input  @input="validateEntries('expenses-vehicles')" v-model="date_vehicle_expenses_end" placeholder="Data final" type="text" autocomplete="off" name="date" mask="11/11/1111"></masked-input>
                    </label>
                  </section>
                  <section class="col col-md-6">
                    <label class="input">
                      <select @change="validateEntries('expenses-vehicles')" v-model="expense_vehicle_state_selected" class="form-control">
                        <option :value="null" disabled="disabled">
                          <== Selecione ==>
                        </option>
                        <option :value="state.id" v-for="state in expenses_vehicles_states">
                          {{ state.label }}
                        </option>
                      </select>
                    </label>
                  </section>
                  <section class="col col-md-6">
                    <label class="input">
                      <select @change="validateEntries('expenses-vehicles')" v-model="expense_vehicles_vendor_selected" class="form-control">
                        <option :value="null" disabled="disabled">
                          <== Selecione um fornecedor ==>
                        </option>
                        <option :value="vendor.id_key" v-for="vendor in expense_vehicles_vendors">
                          {{ vendor.name_with_cpf }}
                        </option>
                      </select>
                    </label>
                  </section>
                  <section class="col col-12">
                    <div class="inline-group">
                      <template v-for="tenant in tenants">
                        <label class="checkbox">
                        <!-- :disabled="formReadonly" v-model="userTenants" -->
                          <input @change="validateEntries('expenses-vehicles')" v-model="entries_tenant" :value="tenant.id_key" type="checkbox" name="checkbox-inline">
                          <i></i> {{ tenant.tenant_name }}
                        </label>
                      </template>
                    </div>
                  </section>
                </div>
              </fieldset>
            </form>
              <div style="margin-top:10px; margin-bottom: 10px;" class="panel-body no-padding">
                <table class="table table-bordered table-condensed">
                  <thead>
                    <tr>
                      <th>Data de vencimento</th>
                      <th>Veículo</th>
                      <th>Despesa</th>
                      <th>Fornecedor</th>
                      <th>Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr :class="{'bg-success': entry.paid, 'bg-danger': !entry.paid}" v-if="current === 'expenses-vehicles'" v-for="entry in registry">
                      <td>{{ entry.date }}</td>
                      <td>
                        <router-link :to="`vehicle-entry/${entry.id}/edit`">
                          {{ entry.plate }}
                        </router-link></td>
                      <td>{{ entry.description }}</td>
                      <td>{{ entry.vendor }}</td>
                      <td class="text-right">R$ {{ entry.amount }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4 class="panel-title">
                <a @click="clear_all" data-toggle="collapse" data-parent="#accordion" href="#c7" :class="{'collapsed': current !== 'sales-ranking-tenant'}">
                  <i class="fa fa-lg fa-angle-up pull-right"></i>
                  <i class="fa fa-lg fa-angle-down pull-right"></i>
                   <span>
                     <i class="fa fa-lg fa-building"></i> Ranking de Vendas por loja
                   </span>
                </a>
              </h4>
            </div>
            <div id="c7" class="panel-collapse collapse" :class="{'in': current === 'sales-ranking-tenant'}">
              <form class="smart-form" novalidate="novalidate">

              <fieldset>
                <div class="row">
                  <section class="col col-md-6">
                    <label class="input"> <i class="icon-append fa fa-calendar"></i>
                      <masked-input  @input="validateEntries('sales-ranking-tenant')" v-model="date_ranking_sales_tenant_initial" placeholder="Data inicial" type="text" autocomplete="off" name="date" mask="11/11/1111"></masked-input>
                    </label>
                  </section>
                  <section class="col col-md-6">
                    <label class="input"> <i class="icon-append fa fa-calendar"></i>
                      <masked-input  @input="validateEntries('sales-ranking-tenant')" v-model="date_ranking_sales_tenant_end" placeholder="Data final" type="text" autocomplete="off" name="date" mask="11/11/1111"></masked-input>
                    </label>
                  </section>
                </div>
              </fieldset>
            </form>
              <div style="margin-top:10px; margin-bottom: 10px;" class="panel-body no-padding">
                <table class="table table-bordered table-condensed">
                  <thead>
                    <tr>
                      <th>Nome Fantasia</th>
                      <th>Razão Social</th>
                      <th>Total em Vendas</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="current === 'sales-ranking-tenant'" v-for="tenant in registry">
                      <td>{{ tenant.tenant_name }}</td>
                      <td>{{ tenant.tenant_fancy_name }}</td>
                      <td class="text-right">R$ {{ tenant.total }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="panel panel-default">
            <div class="panel-heading">
              <h4 class="panel-title">
                <a @click="clear_all" data-toggle="collapse" data-parent="#accordion" href="#c8" :class="{'collapsed': current !== 'sales-ranking-employee'}">
                  <i class="fa fa-lg fa-angle-up pull-right"></i>
                  <i class="fa fa-lg fa-angle-down pull-right"></i>
                   <span>
                     <i class="fa fa-lg fa-user"></i> Ranking de Vendas por vendedor
                   </span>
                </a>
              </h4>
            </div>
            <div id="c8" class="panel-collapse collapse" :class="{'in': current === 'sales-ranking-employee'}">
              <form class="smart-form" novalidate="novalidate">

              <fieldset>
                <div class="row">
                  <section class="col col-md-6">
                    <label class="input"> <i class="icon-append fa fa-calendar"></i>
                      <masked-input  @input="validateEntries('sales-ranking-employee')" v-model="date_ranking_sales_employee_initial" placeholder="Data inicial" type="text" autocomplete="off" name="date" mask="11/11/1111"></masked-input>
                    </label>
                  </section>
                  <section class="col col-md-6">
                    <label class="input"> <i class="icon-append fa fa-calendar"></i>
                      <masked-input  @input="validateEntries('sales-ranking-employee')" v-model="date_ranking_sales_employee_end" placeholder="Data final" type="text" autocomplete="off" name="date" mask="11/11/1111"></masked-input>
                    </label>
                  </section>
                </div>
              </fieldset>
            </form>
              <div style="margin-top:10px; margin-bottom: 10px;" class="panel-body no-padding">
                <table class="table table-bordered table-condensed">
                  <thead>
                    <tr>
                      <th width="75%">Nome</th>
                      <th>Total em Vendas</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="current === 'sales-ranking-employee'" v-for="user in registry">
                      <td>{{ user.name }}</td>
                      <td class="text-right">R$ {{ user.total }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </template>

  <script>
    import { mapState } from 'vuex'
    import { debounce } from 'lodash'
    import numeral from 'numeral'
    export default {
      name: 'hello',
      computed: {
        numeral () {
          return numeral
        },
        ...mapState({
          authenticated: state => state.user.authenticated,
          token: state => state.user.token,
          profile: state => state.user.profile
        })
      },
      methods: {
        clear_all () {
          this.entries_values = []
          this.registry = []
          this.entries_tenant = []
          this.date_entries_first = null
          this.date_entries_end = null
          this.date_sales_first = null
          this.date_sales_end = null
          this.date_stopped_entries_first = null
          this.date_stopped_entries_end = null
          this.date_pendencies_first = null
          this.date_pendencies_end = null
          this.date_employee_sales_first = null
          this.date_employee_sales_end = null
          this.employee_sales_user = 'all'
        },
        validateEntries (tipo) {
          if (tipo === 'sales-ranking-tenant' || tipo === 'sales-ranking-employee') {
            this.entries_tenant = this.tenants.map(tenant => tenant.id_key)
          }

          if (
              (
                (this.date_entries_first && this.date_entries_end) ||
                (this.date_sales_first && this.date_sales_end) ||
                (this.date_stopped_entries_first && this.date_stopped_entries_end) ||
                (this.date_pendencies_first && this.date_pendencies_end) ||
                (this.date_employee_sales_first && this.date_employee_sales_end) ||
                (this.date_vehicle_expenses_first && this.date_vehicle_expenses_end) ||
                (this.date_ranking_sales_tenant_initial && this.date_ranking_sales_tenant_end) ||
                (this.date_ranking_sales_employee_initial && this.date_ranking_sales_employee_end)
              ) &&
              this.entries_tenant.length > 0) {
            var callbackDebounced = debounce(() => {
              if (tipo === 'entries') {
                this.current = 'entries'
                this.refresh('/entries/report-1', {
                  params: {
                    initial_date: this.date_entries_first,
                    end_date: this.date_entries_end,
                    tenants: this.entries_tenant
                  }
                })
              } else if (tipo === 'sales') {
                this.current = 'sales'
                this.refresh('/sales/report-1', {
                  params: {
                    initial_date: this.date_sales_first,
                    end_date: this.date_sales_end,
                    tenants: this.entries_tenant
                  }
                })
              } else if (tipo === 'stopped_entries') {
                this.current = 'stopped_entries'
                this.refresh('/entries/report-2', {
                  params: {
                    initial_date: this.date_stopped_entries_first,
                    end_date: this.date_stopped_entries_end,
                    tenants: this.entries_tenant
                  }
                })
              } else if (tipo === 'pendencies') {
                this.current = 'pendencies'
                this.refresh('/entries/report-3', {
                  params: {
                    initial_date: this.date_pendencies_first,
                    end_date: this.date_pendencies_end,
                    tenants: this.entries_tenant
                  }
                })
              } else if (tipo === 'employee-sales') {
                this.current = 'employee-sales'
                this.refresh('/entries/report-4', {
                  params: {
                    initial_date: this.date_employee_sales_first,
                    end_date: this.date_employee_sales_end,
                    tenants: this.entries_tenant,
                    user: this.employee_sales_user
                  }
                })
              } else if (tipo === 'expenses-vehicles') {
                this.current = 'expenses-vehicles'
                this.refresh('/entries/report-5', {
                  params: {
                    initial_date: this.date_vehicle_expenses_first,
                    end_date: this.date_vehicle_expenses_end,
                    tenants: this.entries_tenant,
                    state: this.expense_vehicle_state_selected,
                    vendor: this.expense_vehicles_vendor_selected
                  }
                })
              } else if (tipo === 'sales-ranking-tenant') {
                this.current = 'sales-ranking-tenant'
                this.refresh('/entries/report-6', {
                  params: {
                    initial_date: this.date_ranking_sales_tenant_initial,
                    end_date: this.date_ranking_sales_tenant_end
                  }
                })
              } else if (tipo === 'sales-ranking-employee') {
                this.current = 'sales-ranking-employee'
                this.refresh('/entries/report-7', {
                  params: {
                    initial_date: this.date_ranking_sales_employee_initial,
                    end_date: this.date_ranking_sales_employee_end
                  }
                })
              }
            }, 500)
            callbackDebounced()
          }
        },
        refresh (endpoint, params) {
          this.$root.axios.get(endpoint, params).then((data) => {
            this.registry = data.data.data
            this.entries_values = data.data
          })
        }
      },
      data () {
        return {
          entries_values: [],
          registry: [],
          tenants: [],
          entries_tenant: [],
          date_entries_first: null,
          date_entries_end: null,
          date_sales_first: null,
          date_sales_end: null,
          date_stopped_entries_first: null,
          date_stopped_entries_end: null,
          date_pendencies_first: null,
          date_pendencies_end: null,
          date_employee_sales_first: null,
          date_employee_sales_end: null,
          current: null,
          employee_sales_user: 'all',
          employees_sales_list: [],
          expenses_vehicles_states: [
            {id: 'todas', label: 'Todas'},
            {id: 'pendente', label: 'Pendente'},
            {id: 'pago', label: 'Pago'}
          ],
          date_vehicle_expenses_first: null,
          date_vehicle_expenses_end: null,
          expense_vehicle_state_selected: null,
          expense_vehicles_vendors: [],
          expense_vehicles_vendor_selected: null,
          date_ranking_sales_tenant_initial: null,
          date_ranking_sales_tenant_end: null,
          date_ranking_sales_employee_initial: null,
          date_ranking_sales_employee_end: null
        }
      },
      mounted () {
        numeral.locale('pt-br')
        this.current = this.$route.params.aba

        this.$root.axios.get('employees').then(({data: {data: {data}}}) => {
          this.employees_sales_list = data
        })

        this.$root.axios.get('/customers').then(({data: {data: {data}}}) => {
          this.expense_vehicles_vendors = data
        })

        this.$root.axios('/tenants', {
          params: {
            'o': 'tenant_fancy_name',
            's': 'desc'
          }
        }).then(({data}) => {
          this.tenants = data.data.data
        })
      }
    }
  </script>
