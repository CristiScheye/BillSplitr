class Api::BillsController < Api::ApiController
  def index
    @bills = Bill.by_or_shared_with(current_user)
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
    # NOTE: might need to also include :id in bill_shares
    params.require(:bill).permit(:amount, :description, bill_shares_attributes: [:id, :debtor_id, :amount])
  end
end