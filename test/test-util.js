"use strict";

var testUtil = {

  getElementText: function(elemSelector) {
    var element = document.querySelector(elemSelector);
    return element.innerText || element.textContent;
  },

  toggleTableFilter: function(tableId) {
    document.querySelector('px-data-table' + tableId + ' span.filter-toggle').click();
  },

  selectTableRow: function(tableId, rowIndex, noHeader) {
    document.querySelector('px-data-table' + tableId + ' .tr.rows:nth-child(' + (rowIndex + (noHeader ? 2 : 3)) + ') aha-html-echo > div').click();
  },

  getAllTableRows: function(tableId) {
    return document.querySelectorAll('px-data-table' + tableId + ' .tr.rows');
  },

  getAllTableCheckboxes: function(tableId) {
    return document.querySelectorAll('px-data-table' + tableId + ' .tr.rows input[type=checkbox]:not([hidden])');
  },

  getDropdownValue: function(selector) {
    var dropdown = document.querySelector(selector);
    var selectedIndex = dropdown.selectedIndex;
    var selectedOptions = dropdown.options[dropdown.selectedIndex];
    return {
      value: selectedOptions.value,
      text: selectedOptions.text
    };
  },

  // column index starts with 1
  toggleTableColumnSort: function(tableId, columnIndex) {
    document.querySelector('px-data-table' + tableId + ' aha-table span.tr > span.th:nth-child(' + (columnIndex + 2) + ') > span.column-head').click();
  },

  getTableSortedText: function(tableId) {
    return testUtil.getElementText('px-data-table'+ tableId +' .th .column-head.sorted-text');
  },

  setTablePagingLimit: function(tableId, limit) {
    this.setDropdownValue('px-data-table' + tableId + ' aha-table span.pagesize > select', limit);
  },

  getTablePagingLimit: function(tableId) {
    return testUtil.getDropdownValue('px-data-table' + tableId + ' aha-table span.pagesize > select');
  },

  setTablePageNumber: function(tableId, pageNum) {
    document.querySelector('px-data-table' + tableId + ' aha-table span.paging > span.pager > span.btn:nth-child(' + pageNum + ')').click();
  },

  getTablePageNumber: function(tableId) {
    return testUtil.getElementText('px-data-table' + tableId + ' aha-table span.paging > span.pager > span.btn--pagination--number');
  },

  //set drop down value
  setDropdownValue: function(dropdownSelector, value) {
    var select = document.querySelector(dropdownSelector);
    if (select && select.options) {
      var index = 0;
      var found = false;
      while (!found && index < select.options.length) {
        if (select.options[index].value === value.toString()) {
          select.selectedIndex = index;
          select.value = value;
          found = true;
        }
        index++;
      }

      if (found) {
        // fire change event manually after changing the value, since the native event is not firing in wct env for some reason
        var event = document.createEvent('HTMLEvents');
        event.initEvent('change', false, true);
        select.dispatchEvent(event);
      }
    }
  }
};
