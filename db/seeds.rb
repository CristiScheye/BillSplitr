# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

guest = User.create({
  f_name: 'Guest',
  l_name: 'User',
  email: 'email@example.com',
  password: 'password'
})
ferris = User.create({
  f_name: 'Ferris',
  l_name: 'Bueller',
  email: 'lifeisgood@example.com',
  password: 'password'
})
dude = User.create({
  f_name: 'Jeffrey',
  l_name: 'Lebowski',
  email: 'the_dude@example.com',
  password: 'password'
})
nancy = User.create({
  f_name: 'Nancy',
  l_name: 'Drew',
  email: 'missdetective@example.com',
  password: 'password'
})
mary = User.create({
  f_name: 'Mary',
  l_name: 'Poppins',
  email: 'supercalifragilistic@example.com',
  password: 'password'
})

b1 = Bill.create({ lender_id: mary.id, amount: 30, description: 'Kites', date: Date.today - 5 })
b2 = Bill.create({ lender_id: guest.id, amount: 40, description: 'Bowling Night', date: Date.today - 1 })
b3 = Bill.create({ lender_id: ferris.id, amount: 44, description: 'Kitchen sink ice cream challenge!!!', date: Date.today - 10 })
b4 = Bill.create({ lender_id: guest.id, amount: 30.55, description: 'Dinner at Zachary\'s', date: Date.today - 3 })

BillShare.create({ bill_id: b1.id, debtor_id: guest.id, amount: 10 })
BillShare.create({ bill_id: b1.id, debtor_id: ferris.id, amount: 10 })

BillShare.create({ bill_id: b3.id, debtor_id: guest.id, amount: 11 })
BillShare.create({ bill_id: b3.id, debtor_id: mary.id, amount: 11 })
BillShare.create({ bill_id: b3.id, debtor_id: nancy.id, amount: 11 })

BillShare.create({ bill_id: b2.id, debtor_id: dude.id, amount: 15 })

BillShare.create({ bill_id: b4.id, debtor_id: nancy.id, amount: 12.50 })
