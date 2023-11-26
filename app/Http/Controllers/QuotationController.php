<?php

namespace App\Http\Controllers;

use App\Mail\QuotationMail;
use App\Models\Quotation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class QuotationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $tableData = $request->input('tableData');
        $user_id = $request->input('user_id');
        $prescription_id = $request->input('prescriptionId');

        // Check if a quotation already exists for the given prescription
        $existingQuotation = Quotation::where('prescription_id', $prescription_id)->first();

        if ($existingQuotation) {
            // Quotation already exists for this prescription
            return response()->json(['message' => 'Quotation already exists for this prescription'], 400);
        }

        // Create a new Quotation instance
        $quotation = new Quotation();
        $quotation->user_id = $user_id;
        $quotation->data = $tableData; // This will automatically JSON encode the data
        $quotation->status_id = 1;
        $quotation->prescription_id = $prescription_id;
        $quotation->save();

        try {

            // Get the user's email using the user_id
            $user = User::findOrFail($user_id); // Fetch the user based on user_id
            $userEmail = $user->email; // Access the user's email

            // Send email
            Mail::to($userEmail)->send(new QuotationMail());

            return response()->json(['message' => 'Quotation email sent successfully']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to send quotation email'], 500);
        }

        return response()->json(['message' => 'Data saved successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $quotation_id = $request->input('quotationId');
        $data = Quotation::find($quotation_id);

        return response()->json($data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Quotation $quotation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Quotation $quotation)
    {
        $quotationId = $request->input('quotationId');
        $accepted = $request->input('accepted');


        // Search for the matching quotation using the quotationId
        $quotation = Quotation::find($quotationId);

        if (!$quotation) {
            return response()->json(['message' => 'Quotation not found'], 404);
        }

        // Update the status_id based on the accepted parameter
        try {

            if ($accepted == true) {
                $quotation->update(['status_id' => 2]);
            } else {
                $quotation->update(['status_id' => 1]);
            }

            return response()->json(['message' => 'Quotation status updated successfully']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update quotation status'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quotation $quotation)
    {
        //
    }
}
