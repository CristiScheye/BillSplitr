class Api::BillsController < Api::ApiController
  def index
    @bills = Bill.between_users(current_user.id, params[:user_id]).order(date: :desc)
    render :index
  end

  def show
    @bill = Bill.find(params[:id])
    render partial: 'api/bills/bill', locals: { bill: @bill }
  end

  def create
    @bill = current_user.bills.build(bill_params)
    if @bill.save
      render partial: 'api/bills/bill', locals: { bill: @bill }
    else
      render json: {
        errors: @bill.errors.full_messages,
        status: :unprocessable_entity
      }
    end
  end

  private

  def bill_params
    clean_params = params.require(:bill).permit(
      :amount,
      :description,
      :date,
      bill_shares_attributes: [
        :id,
        :debtor_id,
        :amount
        ])
    clean_params[:date] = Date.strptime(clean_params[:date], '%m/%d/%Y')
    clean_params
  end
end
