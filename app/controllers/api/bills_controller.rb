class Api::BillsController < Api::ApiController
  def index
    @bills = current_user.bills
    render :index
  end

  def show
    @bill = Bill.find(params[:id])
    render :show
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
    params.require(:bill).permit(:amount, :description)
  end
end