export class AdminDashboardResponse {
  totalUsers!: number;

  totalCustomers!: number;

  totalOwners!: number;

  totalAdmins!: number;

  totalVehicles!: number;

  availableVehicles!: number;

  unavailableVehicles!: number;

  totalBookings!: number;

  pendingBookings!: number;

  confirmedBookings!: number;

  cancelledBookings!: number;

  completedBookings!: number;

  totalPayments!: number;

  successfulPayments!: number;

  pendingPayments!: number;

  failedPayments!: number;

  totalRevenue!: number;

  totalReviews!: number;

  averageRating!: number;

  totalFavorites!: number;

  constructor(data: {
    totalUsers: number;
    totalCustomers: number;
    totalOwners: number;
    totalAdmins: number;
    totalVehicles: number;
    availableVehicles: number;
    unavailableVehicles: number;
    totalBookings: number;
    pendingBookings: number;
    confirmedBookings: number;
    cancelledBookings: number;
    completedBookings: number;
    totalPayments: number;
    successfulPayments: number;
    pendingPayments: number;
    failedPayments: number;
    totalRevenue: number;
    totalReviews: number;
    averageRating: number;
    totalFavorites: number;
  }) {
    this.totalUsers = data.totalUsers;
    this.totalCustomers = data.totalCustomers;
    this.totalOwners = data.totalOwners;
    this.totalAdmins = data.totalAdmins;

    this.totalVehicles = data.totalVehicles;
    this.availableVehicles = data.availableVehicles;
    this.unavailableVehicles = data.unavailableVehicles;

    this.totalBookings = data.totalBookings;
    this.pendingBookings = data.pendingBookings;
    this.confirmedBookings = data.confirmedBookings;
    this.cancelledBookings = data.cancelledBookings;
    this.completedBookings = data.completedBookings;

    this.totalPayments = data.totalPayments;
    this.successfulPayments = data.successfulPayments;
    this.pendingPayments = data.pendingPayments;
    this.failedPayments = data.failedPayments;
    this.totalRevenue = data.totalRevenue;

    this.totalReviews = data.totalReviews;
    this.averageRating = data.averageRating;

    this.totalFavorites = data.totalFavorites;
  }
}
