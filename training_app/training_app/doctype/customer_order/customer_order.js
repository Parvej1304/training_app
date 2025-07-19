frappe.ui.form.on('Customer Order', {
  refresh(frm) {
    frappe.msgprint("Welcome to the Customer Order Form!");

    frm.add_custom_button('Show Previous Orders', () => {
      if (frm.doc.customer) {
        frappe.call({
          method: 'training_app.training_app.doctype.customer_order.customer_order.get_customer_orders',
          args: {
            customer: frm.doc.customer
          },
          callback: function(r) {
            const data = r.message;
            if (data.orders && data.orders.length) {
              const order_list = data.orders.map(row =>
                `Order: ${row.name} | Date: ${row.order_date}`
              ).join('<br>');

              frappe.msgprint(`
                <b>Customer:</b> ${data.customer_name}<br>
                <b>Email:</b> ${data.customer_email}<hr>
                ${order_list}
              `);
            } else {
              frappe.msgprint("No previous orders.");
            }
          }
        });
      }
    });
  },
  validate(frm) {
    if (!frm.doc.order_type) {
      frappe.throw("Please select an Order Type.");
    }
  }
});
